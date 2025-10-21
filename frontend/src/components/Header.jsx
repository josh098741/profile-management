import { UserCircle2 } from 'lucide-react'


function Header(){
    return(
        <div className="h-20 bg-gradient-to-r from-blue-500 to-green-400 flex justify-between p-5">
            <div>
                <h1 className="text-xl">Infinity Quest Labs Authentication</h1>
            </div>
            <div>
                <UserCircle2 size={30} />
            </div>
        </div>
    )
}

export default Header