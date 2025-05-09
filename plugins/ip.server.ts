export default defineNuxtPlugin(() => {
    const ip = useState('ip', () => null)
  
    const event = useRequestEvent()
  
    // attempt to get IP
    ip.value = event.req.headers['x-real-ip'] || event.req.headers['x-forwarded-for'] || event.req.socket?.remoteAddress
  })