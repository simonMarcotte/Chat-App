import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import { Box } from '@chakra-ui/react'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chat Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box h={"100vh"}>
        <Sidebar />
      </Box>
      

    </div>
  )
}