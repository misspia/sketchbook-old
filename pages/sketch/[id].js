import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import MediaActivator from "@components/MediaActivator"
import Loader from "@components/Loader"

const getSketch = (id) => {
  console.debug('[id]', id)
  return dynamic(
    () => import(`../../src/sketches/S${id}`),
    {
      loading: ({ isLoading }) => {
        if(isLoading) {
          return (
            <Loader />
          )
        }
        return null
      }
    }
  )
}
export default function Page() {
  const router = useRouter()
  const { id } = router.query

  const Sketch = getSketch(id)

  if(!Sketch) {
    router.push("/404")
    return
  }

  return (
    <Sketch />
   )
}
