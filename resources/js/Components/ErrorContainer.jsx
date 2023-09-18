export default function ErrorContainer({errors}) {
    return(
        <>
            {errors && (
                <ul className="bg-red-500 rounded-md m-2 p-3 text-sm">
                    {Object.keys(errors).map((error, index) => (
                        <>
                            {errors[error].map((err, index) => (
                                <li key={index}>{err}</li>
                            ))}
                        </>
                    ))}
                </ul>
            )}
        </>
    )
}