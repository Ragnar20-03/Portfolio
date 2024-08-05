
import { useNavigate } from "react-router-dom";
import { Button } from "./Button"

export const Nav = () => {  

    const navigate = useNavigate()  ;
    return <div className=" p-4 m-4 bg-slate-800 text-white rounded-md flex justify-center">
        <div className="flex flex-row space-x-5 ">
        <Button onClick={() => {
            navigate('/projects')
            }} >
                Projects
        </Button>
            <Button onClick={() => {
                console.log("hii");
            }} >
                About
            </Button>
        </div>
    </div>
}