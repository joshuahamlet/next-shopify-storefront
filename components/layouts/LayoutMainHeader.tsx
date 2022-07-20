import { AnimatePresence } from "framer-motion"
import { useAtom } from "jotai"
import { filterClickedAtom } from "../atoms"
import Header from "../Header"

const LayoutMainHeader = ({children}) => {
  const [filterClicked, setFilterClicked] = useAtom(filterClickedAtom)
  const filterHandler = () => {
    setFilterClicked(false)
    console.log(filterClicked)
  }
  return(
    <div onClick={filterHandler} style={{ width: "100vw", height: "100vh"}}>
      <Header title="Pasta"/>
      <AnimatePresence exitBeforeEnter>
      {children}        
      </AnimatePresence>
    </div>
  )    
}

export default LayoutMainHeader