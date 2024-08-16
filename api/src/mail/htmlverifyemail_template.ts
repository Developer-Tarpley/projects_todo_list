


export default function verficationPWDemailTemplate(token: string, id: number) {
    return (`
        <html>
        <h1>Reset Your Password</h1>
        <p>Click <a href="http://localhost:3075/auth/reset_password/${token}/${id}" target="_blank">Here</a></p>
        </html>
    `)
}