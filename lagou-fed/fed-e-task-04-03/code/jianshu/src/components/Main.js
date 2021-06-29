import { Box, Image, Button, Text } from '@chakra-ui/react'
import { Switch, Link, Route, useLocation } from 'react-router-dom'
import logo from '../assets/images/jianshu_logo.png'
import bgImage from '../assets/images/bg.png'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default function Main () {
  const { pathname } = useLocation()

  return (
    <Box bg="gray.100" h="100vh" d="flex" alignItems="center">
      <Image width="100px" src={logo} pos="absolute" top="56px" left="50px" />
      <Box w="820px" h="600px" mx="auto" bgImage={bgImage} bgSize="40%" bgPos="45px 0" pos="relative" bgRepeat="no-repeat">
        <Box float="left" w="50%" p={2} h="500px" alignItems="flex-end" d="flex" justifyContent="center">
          <Button w="252px" h="46px" bg="tomato" color="white" borderRadius="30px" overflow="hidden" fontSize="18px" fontWeight="500">下载简书APP</Button>
        </Box>

        <Box w="50%" float="right" pt={50} pr={50} pb={30} pl={50}  bg="white" boxShadow="lg" borderRadius="lg" overflow="hidden">
          <Box d="flex" justifyContent="space-around" mb={50}>
            <Link to="/sign_in"><Text color={pathname !== '/sign_up' ? '#ea6f5a': "gray.900"} fontSize="2xl" fontWeight="lg">登录</Text></Link>
            <Link to="/sign_up"><Text color={pathname === '/sign_up' ? '#ea6f5a': "gray.900"} fontSize="2xl" fontWeight="lg">注册</Text></Link>
          </Box>
          <Box>
            <Switch>
              <Route path="/sign_in">
                <SignIn />
              </Route>
              <Route path="/sign_up">
                <SignUp />
              </Route>
              <Route path="/">
                <SignIn />
              </Route>
            </Switch>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
