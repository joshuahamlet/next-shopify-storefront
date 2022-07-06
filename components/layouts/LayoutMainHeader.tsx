import Header from "../Header"

const LayoutMainHeader = ({children}) => {
  return(
    <div style={{ width: "100vw", height: "100vh"}}>
      <Header title="Pasta"/>
      {children}        
    </div>
  )    
}

export default LayoutMainHeader