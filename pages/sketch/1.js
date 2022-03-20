import dynamic from "next/dynamic"
const Sketch = dynamic(() => import('../sketch/path/001.js')) 

export default function Page() {
  return (
    <Sketch />
  )
}
