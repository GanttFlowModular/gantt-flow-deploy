
import Image from "next/image";
import Button from "../../components/button";

export default function Dashboard() {
    return (
        <div className="flex flex-col m-4 mx-4">
            {/* Header */}
            <header className="flex justify-start items-center">
                <div className="ml-2">
                    <Image
                        className="dark:invert"
                        src="/burgerMenu.svg"
                        alt="Next.js logo"
                        width={19}
                        height={15}
                        priority
                    />
                </div>
                <div className="ml-8">
                    <Image
                        className="dark:invert"
                        src="/logo.svg"
                        alt="Next.js logo"
                        width={40}
                        height={40}
                        priority
                    />
                </div>
                <div>
                    <Image
                        className="dark:invert"
                        src="/ganttflow.svg"
                        alt="Next.js logo"
                        width={114}
                        height={18}
                        priority
                    />
                </div>

                <div className="ml-auto">
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-4 pr-96 py-2 border border-blue-500 placeholder-black rounded-full"
                    />
                </div>

                <div className="ml-auto mr-4">
                    <Button
                        icon="/bell.svg"
                        iconWidth={40}
                        iconHeight={40}
                        bgColor="bg-transparent"
                        border="border-none"
                    />
                </div>
                <div className="space-x-16">
                    <Button
                        icon="/avatar.svg"
                        iconWidth={40}
                        iconHeight={40}
                        bgColor="bg-transparent"
                        border="border-none"
                    />
                </div>
            </header >

        </div >

    );
}