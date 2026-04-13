
export const metadata = {
    title: "Email Verified",
};


export default function VerifyMessageScreen() {

    return <div className="bg-white dark:bg-black py-32 px-16 w-full" >
        <div className="flex flex-col items-center justify-center">
            <div className="card shadow-md p-8 justify-center max-w-lg">
                <h2 className="w-full font-bold text-xl">Email Verified</h2>
                <p className="w-full mt-2">Your email address has been verified! You can close this tab.</p>
            </div>
        </div>
    </div>
}