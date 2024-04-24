import { CloseIcon } from "@chakra-ui/icons";
import { Avatar, Button, Center, Flex, IconButton } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import getOtherEmail from "../utils/getOtherEmail";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";


export default function Sidebar () {
    
    const [user] = useAuthState(auth);
    const [snapshot, loading, error] = useCollection(collection(db, "chats"));
    const chats = snapshot?.docs.map((doc => ({id: doc.id, ...doc.data()})))
    const router = useRouter()

    const redirect = async (id) => {
        router.push(`/chat/${id}`);
    }

    const chatExists = email => chats?.find(chat => chat.users.includes(user.email) && chat.users.includes(email))

    const newChat = async () => {
        const input = prompt("Enter email of new chat participant")
        if (!chatExists(input) && (input != user.email) && (input != null) && (input != "")){
            console.log(input)
            await addDoc(collection(db, "chats"), {users: [user.email, input]})
        }

    }


    const chatList = () => {
        return (
            chats?.filter(chat => chat.users.includes(user.email))
            .map(
                chat => 
                <Flex key={Math.random()} _hover={{bg: "gray.100", cursor: "pointer"}}
                    align={"center"}
                    p={3}
                    transitionDuration={"0.25s"}
                    onClick={() => redirect(chat.id)}>
                    <Avatar src="" m={3}/>
                    <Text>{getOtherEmail(chat.users, user)}</Text>
                </Flex>
            )
            
        )
    }

    return (

        <Flex //bgColor={"gray.200"} 
            w={300} border={"1px"} borderColor={"gray.300"} direction={"column"} h={"100%"}>

            <Flex h={"81px"} 
                //bgColor={"green.100"} 
                w={"100%"} align={"center"} justifyContent={"space-between"} padding={3}
                borderBottom={"1px solid"} borderColor={"gray.300"}>

                <Flex align={"center"}>
                    <Avatar src={user.photoURL} margin={3}/>
                    <Text>{user.displayName}</Text>
                </Flex>
                
                <IconButton size={"sm"} isRound icon={<CloseIcon/>} onClick={() => signOut(auth)}/>
            </Flex>

            <Button m={5} p={4} onClick={() => newChat()}>New Chat</Button>

            <Flex overflowX={"scroll"} direction={"column"} sx={{scrollbarWidth: "none"}} flex={1}>
                {chatList()}
            </Flex>
            

        </Flex>
    )
}