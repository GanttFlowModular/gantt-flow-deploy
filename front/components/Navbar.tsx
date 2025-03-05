import Link from 'next/link'
import second from 'next-auth/react'

function Navbar(){
    return(
        <nav>
            <Link>
                <h1>
                    NextGoogle
                </h1>
            </Link>
            <div>
                <Link href="/dashboard">

                </Link>
            </div>

        </nav>
    )
}
export default Navbar

