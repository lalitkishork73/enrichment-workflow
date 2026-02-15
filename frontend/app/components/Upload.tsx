'use client'

import { useState } from "react"
import { useUpload } from "../hooks/useUpload"

export default function Upload () {
    const [file, setFile] = useState<File | null>(null)
    const uploadMutation = useUpload()

    const handleUpload = () => {
        if (!file) return
        uploadMutation.mutate(file)
    }

    return (
        <div className="w-full max-w-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload CSV</h2>

            <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col gap-4">
                <label className="text-sm font-medium text-gray-700">
                    Select file
                </label>

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100
                     cursor-pointer"
                />

                {file && (
                    <p className="text-sm text-gray-500">
                        Selected: <span className="font-medium">{file.name}</span>
                    </p>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!file || uploadMutation.isPending}
                    className="mt-2 inline-flex items-center justify-center
                     rounded-xl bg-blue-600 px-4 py-2.5
                     text-sm font-semibold text-white
                     shadow-sm transition
                     hover:bg-blue-700
                     disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploadMutation.isPending ? "Uploading..." : "Upload File"}
                </button>

                {uploadMutation.isError && (
                    <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-3 py-2 text-sm font-medium">
                        Upload failed
                    </div>
                )}

                {uploadMutation.isSuccess && (
                    <div className="bg-green-50 text-green-700 border border-green-200 rounded-lg px-3 py-2 text-sm font-medium">
                        Upload successful
                    </div>
                )}
            </div>
        </div>
    )
}
