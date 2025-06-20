const ENDPOINT = import.meta.env.PUBLIC_ENDPOINT

export const search = async (data: string) => {
    const jsonData = JSON.stringify({ data });
    try {
        return await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "origin",
            },
            body: jsonData,
        })
            .then(
                (response) => {
                    return response.json();
                },
                (error) => {
                    throw new Error(error.message || "Error searching data");
                }
            )
    } catch (error: any) {
        alert(error.message || "Unspecified error");
    }
}