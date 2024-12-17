import { useState, useCallback } from "react"

interface IRequestHookProps {
    (
        url: string,
        method: string,
        body: string | object | null,
        headers?: {
            Authorization?: string | null
            ['Content-Type']?: string
        },
    ): Promise<any>
}

interface IFetch {
    (
        url: string,
        params: {
            method: string
            body: object | null,
            headers: {
                ['Content-Type']?: string
            },
        }
    ): any
}

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const request = useCallback<IRequestHookProps>(
        async (url, method = 'GET', body = null, headers = {}) => {

            setLoading(true)

            try {
                if (body instanceof FormData) {
                } else if (body && !headers['Content-Type']) {
                    body = JSON.stringify(body)
                    headers['Content-Type'] = 'application/json'
                }

                //@ts-ignore
                const response: any = await fetch<IFetch>(url, {
                    method, body, headers
                })

                const data: any = await response.json()

                if (!response.ok) {
                    setLoading(false)
                    throw new Error(data.message || 'Smth was wrong')
                }

                setLoading(false)

                return data

            } catch (e) { }

        }, []
    )

    const clearError = useCallback(() => setError(null), [])

    return { loading, error, request, clearError }
}

