import { useState } from 'react'
import axios from 'axios'
import { FaUserAlt, FaLock, FaWeixin, FaQq, FaPhone } from 'react-icons/fa'
import { Stack, InputGroup, InputLeftAddon, Input, Link, Text, Button, HStack, Divider, useToast } from '@chakra-ui/react'

export default function SignUp () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast()

  const handleSignUp = async () => {
    try {
      await axios.post('https://conduit.productionready.io/api/users', {
        user: {
          username,
          email,
          password
        }
    })
    toast({
      title: "登录成功",
      description: "登录成功",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
    } catch(e) {
      const errors = e.response.data.errors
      const message = 
      errors.username ? `username ${errors.username[0]}` :
      errors.email ? `email ${ errors.email[0]}` :
      errors.password ? `password ${ errors.password[0]}` : ''

      toast({
        title: "注册失败",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <form>
      <Stack spacing={8}>
        <Stack>
          <InputGroup>
            <InputLeftAddon color="gray.400" children={<FaUserAlt />} value={username} />
            <Input placeholder="你的昵称" onChange={e => setUsername(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon color="gray.400" children={<FaPhone />} value={email} />
            <Input placeholder="手机号" onChange={e => setEmail(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon color="gray.400" children={<FaLock />} value={password}  />
            <Input type="password" placeholder="设置密码" onChange={e => setPassword(e.target.value)} />
          </InputGroup>
        </Stack>
        <Button w="100%" color="white" bgColor="#42c02e" _hover={{bgColor: '#3db922'}} borderRadius="30px" onClick={handleSignUp}>
          注册
        </Button>
        <Text fontSize="12px" color="gray.500" textAlign="center">
          点击 “注册” 即表示您同意并愿意遵守简书<br/>
          <Link color="#3194d0" href="#">用户协议</Link>
          和
          <Link color="#3194d0" href="#">隐私政策 </Link>
          。
        </Text>
        <HStack justifyContent="space-between">
          <Divider w={ 1/4 } />
          <Text color="gray.500" fontSize="12px">社交账号登录</Text>
          <Divider w={ 1/4 } />
        </HStack>
        <HStack fontSize="2xl" justifyContent="center" spacing="5">
          <FaWeixin color="#00bb29"/>
          <FaQq color="#498ad5"/>
        </HStack>
      </Stack>
    </form>
  )
}
