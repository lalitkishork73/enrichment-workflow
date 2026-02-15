'use client'

import { useCompanies } from "../hooks/useCompanies"

export default function List () {
    const { data: companies, isLoading, isError } = useCompanies()

    return (
        <div className="w-full p-6">
            <h1 className="text-2xl font-semibold mb-4">Companies</h1>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
                <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr className="text-left text-sm font-semibold text-gray-700">
                            <th className="px-4 py-3">Domain</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Industry</th>
                            <th className="px-4 py-3">Company Size</th>
                            <th className="px-4 py-3">Revenue Range</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {/* Loading state */}
                        {isLoading && (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-500">
                                    Loading companies...
                                </td>
                            </tr>
                        )}

                        {/* Error state */}
                        {isError && (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-red-600">
                                    Failed to load companies
                                </td>
                            </tr>
                        )}

                        {/* Empty state */}
                        {!isLoading && companies?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-500">
                                    No companies yet
                                </td>
                            </tr>
                        )}

                        {/* Data rows */}
                        {companies?.map((company) => (
                            <tr
                                key={company.id}
                                className="text-sm hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3 font-medium text-gray-900">
                                    {company.domain}
                                </td>

                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${company.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : company.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {company.status}
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-gray-600">
                                    {company.industry ?? "—"}
                                </td>

                                <td className="px-4 py-3 text-gray-600">
                                    {company.company_size ?? "—"}
                                </td>

                                <td className="px-4 py-3 text-gray-600">
                                    {company.revenue_range ?? "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
