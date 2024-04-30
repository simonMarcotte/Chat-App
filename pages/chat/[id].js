import { Flex, Text } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { collection, doc, orderBy, query} from "firebase/firestore";
import { db, auth} from "../../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import getOtherEmail from "../../utils/getOtherEmail";
import Topbar from "../../components/Topbar";
import Bottombar from "../../components/Bottombar";
import { useEffect, useRef } from "react";




// TODO GET RID OF MATH. RANDOPM
// ADD RULES TO DB
export default function Chat () {

    const router = useRouter();
    const { id } = router.query;

    const [user] = useAuthState(auth)

    const q = query(collection(db, "chats", id, "messages"), orderBy("timestamp"));
    const [messages] = useCollectionData(q);

    const [chat] = useDocumentData(doc(db, "chats", id));

    const bottomOfChat = useRef();

    const getMessages = () =>
        messages?.map(msg => {

            const sender = msg.sender === user.email;

            return (
                <Flex key={Math.random()} alignSelf={sender ? "flex-start" : "flex-end"} bg={sender ? "blue.100" : "green.100"} width={"fit-content"} minWidth={"50px"} borderRadius={"lg"} p={3} m={1}>
                    <Text>{msg.text}</Text>
                </Flex>
            )
        })

        useEffect(() => {
            const timer = setTimeout(() => {
                if (bottomOfChat.current) {
                    bottomOfChat.current.scrollIntoView({
                        behavior: "smooth",
                        block: 'start',
                    });
                }
            }, 100);
        
            // Cleanup function to clear the timeout if the component unmounts
            return () => clearTimeout(timer);
        }, [messages]); // Assuming you want this effect to run every time 'messages' changes
        

    
    return (
        <Flex
            h={"100vh"}
            >
            
            <Head>
                <title>Chat Clone</title>
            </Head>

            <Sidebar />

            <Flex flex={1} direction={"column"}>
                <Topbar email={getOtherEmail(chat?.users, user)} />

                <Flex flex={1} direction={"column"} pt={4} mx={4} overflowX={"scroll"} sx={{scrollbarWidth: "none"}}>
                    
                    {getMessages()}
                    <div ref={bottomOfChat}></div>
                    
                </Flex>

                <Bottombar id={id} user={user}/>
            </Flex>
        </Flex>
    )
}