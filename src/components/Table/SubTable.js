import { useState, useEffect, useMemo } from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import DebouncedInput from './DebouncedInput';
import MemberService from '../../services/MemberService.js';

const BaseTable = ({
    type,
    ptId,
    setOpenMemberOfPTModal,
    memberId,
    setOpenMemberInfoModal,
}) => {
    const columnHelper = createColumnHelper();
    // initial columns if there is no data
    console.log(ptId);
    const [data, setData] = useState(() => {
        switch (type) {
            case 'personal-config':
                return [
                    {
                        height: 0,
                        weight: 0,
                        age: 0,
                        fat: 0,
                        bmi: 0,
                        date: '2023-11-30',
                    },
                ];
                break;
            case 'membersOfPT':
                return [
                    {
                        personalLevel: '',
                        fullName: '',
                        memberLevel: '',
                        email: '',
                        avatar: null,
                        activated: 'true',
                        hasProgram: 'true',
                        goal: '',
                    },
                ];
                break;
        }
    });
    const loadPage = async () => {
        try {
            let result;
            switch (type) {
                case 'personal-config':
                    result = await MemberService.getMembersPhysicalInformation(
                        memberId,
                    );

                    if (result.length !== 0) {
                        const processedResults = result.map((element) => ({
                            height: element.height,
                            weight: element.weight,
                            age: element.age,
                            fat: element.fat,
                            bmi: element.bmi,
                            date: element.date.toString(),
                        }));
                        setData([...processedResults]);
                    } else {
                        setData([
                            {
                                height: 0,
                                weight: 0,
                                age: 0,
                                fat: 0,
                                bmi: 0,
                                date: '2023-11-30',
                            },
                        ]);
                    }

                    break;
                case 'membersOfPT':
                    result = await MemberService.getMembersByPTId(ptId);

                    if (result.length !== 0) {
                        const processedResults = result.map((element) => ({
                            personalLevel: element.personalLevel,
                            fullName:
                                element.firstName + ' ' + element.lastName,
                            memberLevel: element.memberLevel,
                            Email: element.user.email,
                            Activated: element.user.activated.toString(),
                            hasProgram: element.hasProgram.toString(),
                            goal: element.goal,
                        }));

                        console.log(processedResults);
                        setData([...processedResults]);
                    }
                    break;
            }
        } catch (err) {
            console.log('load fail');
        }
    };

    useEffect(() => {
        loadPage();
    }, []);
    let columns = [
        columnHelper.accessor('', {
            id: 'No',
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: 'No',
        }),
        ...Object.keys(data[0])?.map((field) => {
            return columnHelper.accessor(field, {
                cell: (info) => <span>{info.getValue()}</span>,
                header: camelToCapitalize(field),
            });
        }),
    ];

    // config table
    const [globalFilter, setGlobalFilter] = useState('');

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    return (
        <div
            className="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll z-50
        justify-center items-center flex bg-[#00000080] "
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                if (type === 'membersOfPT') {
                    setOpenMemberOfPTModal(false);
                } else {
                    setOpenMemberInfoModal(false);
                }
            }}
        >
            <div className="p-2 max-w-8xl mx-auto text-white fill-gray-400 bg-gray-600">
                <div className="flex justify-between mb-2">
                    <div className="w-full flex items-center gap-1">
                        <SearchIcon />
                        <DebouncedInput
                            value={globalFilter ?? ''}
                            onChange={(value) => setGlobalFilter(String(value))}
                            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
                            placeholder="Search all columns..."
                        />
                    </div>
                </div>
                <table className="border border-gray-700 w-full text-left">
                    <thead className="bg-red-800 text-center">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="capitalize px-3.5 py-2"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <tr
                                    key={row.id}
                                    className={`
                    ${i % 2 === 0 ? 'bg-gray-900 ' : 'bg-gray-800'}
                    `}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-3.5 py-2 text-center"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center h-32">
                                <td colSpan={12}>No Record Found!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* pagination */}
                <div className="flex items-center justify-end mt-2 gap-2">
                    <button
                        onClick={() => {
                            table.previousPage();
                        }}
                        disabled={!table.getCanPreviousPage()}
                        className="p-1 border border-gray-300 px-2 disabled:opacity-30"
                    >
                        {'<'}
                    </button>
                    <button
                        onClick={() => {
                            table.nextPage();
                        }}
                        disabled={!table.getCanNextPage()}
                        className="p-1 border border-gray-300 px-2 disabled:opacity-30"
                    >
                        {'>'}
                    </button>

                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </strong>
                    </span>
                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={
                                table.getState().pagination.pageIndex + 1
                            }
                            onChange={(e) => {
                                const page = e.target.value
                                    ? Number(e.target.value) - 1
                                    : 0;
                                table.setPageIndex(page);
                            }}
                            className="border p-1 rounded w-16 bg-transparent"
                        />
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="p-2 bg-transparent"
                    >
                        {[10, 20, 30, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
const SearchIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
        >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
    );
};
function camelToCapitalize(inputStr) {
    return inputStr
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^./, (str) => str.toUpperCase());
}
function parseDate(string) {
    const birthday = new Date(string);

    // Lấy ngày, tháng, năm
    const day = birthday.getDate();
    const month = birthday.getMonth() + 1; // Ghi chú: getMonth trả về giá trị từ 0 đến 11
    const year = birthday.getFullYear();

    // Tạo chuỗi ngày tháng năm
    return `${day}/${month}/${year}`;
}
export default BaseTable;
