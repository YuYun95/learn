import { useState } from 'react'
import axios from 'axios'
import { FaUserAlt, FaLock, FaWeibo, FaWeixin, FaQq } from 'react-icons/fa'
import { Stack, InputGroup, InputLeftAddon, Input, Checkbox, Text, Button, HStack, Divider, useToast } from '@chakra-ui/react'


export default function SignIn () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast()

  const handleSignIn = async () => {
    try {
      const { data } = await axios.post('https://conduit.productionready.io/api/users/login', {
      user: {
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
    console.log('密码', data)
    }catch(e) {
      toast({
        title: "登录失败",
        description: "登录失败",
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
            <InputLeftAddon color="gray.400" children={<FaUserAlt />} value={email} />
            <Input placeholder="手机号或邮箱" onChange={e => setEmail(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon color="gray.400" children={<FaLock />} value={password}  />
            <Input type="password" placeholder="密码" onChange={e => setPassword(e.target.value)} />
          </InputGroup>
        </Stack>
        <Stack direction="row" justify="space-between" color="gray.400">
          <Checkbox defaultChecked>记住我</Checkbox>
          <Text color="gray.400">
            登录遇到问题？
          </Text>
        </Stack>
        <Button w="100%" color="white" bgColor="#3194d0" _hover={{bgColor: '#187cb7'}} borderRadius="30px" onClick={handleSignIn}>
          登录
        </Button>
        <HStack justifyContent="space-between">
          <Divider w={ 1/4 } />
          <Text color="gray.500" fontSize="12px">社交账号登录</Text>
          <Divider w={ 1/4 } />
        </HStack>
        <HStack fontSize="2xl" justifyContent="center" spacing="5">
          <FaWeibo color="#e05244"/>
          <FaWeixin color="#00bb29"/>
          <FaQq color="#498ad5"/>
        </HStack>
      </Stack>
    </form>
  )
}
