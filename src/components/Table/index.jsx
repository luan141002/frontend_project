import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { USERS } from './data.js';
import { useState, useEffect } from 'react';
import DebouncedInput from './DebouncedInput';
import UploadExercise from '../../pages/UploadExcercise';
import { useDispatch, useSelector } from 'react-redux';
import MemberService from '../../services/MemberService.js';
import ExerciseService from '../../services/ExerciseService.js';

const TanStackTable = ({ type }) => {
    const columnHelper = createColumnHelper();
    const account = useSelector((state) => state.account);
    const isPT = account.roles[0]?.name === 'PERSONAL_TRAINER' ? true : false;

    const [data, setData] = useState(() => {
        switch (type) {
            case 'personal-config':
                return [
                    {
                        id: 1,
                        height: 0,
                        weight: 0,
                        age: 0,
                        fat: 0,
                        bmi: 0,
                        date: '2023-11-30',
                    },
                ];
                break;
            case 'members':
                return [
                    {
                        id: 0,
                        personalLevel: '',
                        firstName: '',
                        lastName: '',
                        memberLevel: '',
                        email: '',
                        avatar: null,
                        activated: 'true',
                    },
                ];
                break;
            case 'pts':
                return [
                    {
                        id: 0,
                        firstName: 'string',
                        lastName: 'string',
                        ptLevel: 'string',
                        email: 'string',
                        activated: true,
                    },
                ];
                break;
            case 'exercises':
                return [
                    {
                        id: 0,
                        name: '',
                        experienceLevel: '',
                        equipment: '',
                        forceType: '',
                        secondaryMuscles: '',
                        type: '',
                        steps: 0,
                        category: '',
                        tips: '',
                    },
                ];
                break;
            case 'membersOfPT':
                return [
                    {
                        id: 0,
                        personalLevel: '',
                        firstName: '',
                        lastName: '',
                        memberLevel: '',
                        email: '',
                        avatar: null,
                        activated: 'true',
                        hasProgram: 'true',
                    },
                ];
                break;
        }
    });

    const loadPage = async () => {
        let result;

        switch (type) {
            case 'personal-config':
                result = await MemberService.getMembersPhysicalInformation(
                    account?.memberId,
                );

                if (result.length !== 0) {
                    const processedResults = result.map((element) => ({
                        id: element.id,
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
                            id: 0,
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
            case 'members':
                result = await MemberService.getMembers();

                if (result.length !== 0) {
                    const processedResults = result.map((element) => ({
                        id: element.id,
                        personalLevel: element.personalLevel,
                        firstName: element.firstName,
                        lastName: element.lastName,
                        memberLevel: element.memberLevel,
                        Email: element.user.email,
                        Activated: element.user.activated.toString(),
                    }));

                    console.log(processedResults);
                    setData([...processedResults]);
                }
                break;
            case 'pts':
                result = await MemberService.getPTs();

                if (result.length !== 0) {
                    const processedResults = result.map((element) => ({
                        id: element.id,
                        firstName: element.firstName,
                        lastName: element.lastName,
                        ptLevel: element.ptLevel,
                        email: element.user.email,
                        activated: element.user.activated.toString(),
                    }));

                    console.log(processedResults);
                    setData([...processedResults]);
                }
                break;
            case 'exercises':
                result = await ExerciseService.getExercises();

                if (result.length !== 0) {
                    const processedResults = result.map((element) => ({
                        id: element.id,
                        name: element.name,
                        experienceLevel: element.experienceLevel,
                        equipment: element.equipment,
                        forceType: element.forceType,
                        secondaryMuscles: element.secondaryMuscles,
                        type: element.type,
                        steps: element.steps.length,
                        category: element.category,
                        tips: element.tips,
                    }));

                    console.log(processedResults);
                    setData([...processedResults]);
                }
                break;
            case 'membersOfPT':
                result = await MemberService.getMembersByPTId(account.memberId);

                if (result.length !== 0) {
                    const processedResults = result.map((element) => ({
                        id: element.id,
                        personalLevel: element.personalLevel,
                        firstName: element.firstName,
                        lastName: element.lastName,
                        memberLevel: element.memberLevel,
                        Email: element.user.email,
                        Activated: element.user.activated.toString(),
                        hasProgram: element.hasProgram.toString(),
                    }));

                    console.log(processedResults);
                    setData([...processedResults]);
                }
                break;
            default:
                break;
        }

        console.log(result);
    };

    useEffect(() => {
        loadPage();
    }, [type]);

    // const columns = [
    //     columnHelper.accessor('', {
    //         id: 'S.No',
    //         cell: (info) => <span>{info.row.index + 1}</span>,
    //         header: 'S.No',
    //     }),
    //     columnHelper.accessor('profile', {
    //         cell: (info) => (
    //             <img
    //                 src={info?.getValue()}
    //                 alt="..."
    //                 className="rounded-full w-10 h-10 object-cover"
    //             />
    //         ),
    //         header: 'Profile',
    //     }),
    //     columnHelper.accessor('firstName', {
    //         cell: (info) => <span>{info.getValue()}</span>,
    //         header: 'First Name',
    //     }),
    //     columnHelper.accessor('lastName', {
    //         cell: (info) => <span>{info.getValue()}</span>,
    //         header: 'Last Name',
    //     }),
    //     columnHelper.accessor('age', {
    //         cell: (info) => <span>{info.getValue()}</span>,
    //         header: 'Age',
    //     }),
    //     columnHelper.accessor('visits', {
    //         cell: (info) => <span>{info.getValue()}</span>,
    //         header: 'Visits',
    //     }),
    //     columnHelper.accessor('progress', {
    //         cell: (info) => <span>{info.getValue()}</span>,
    //         header: 'Progress',
    //     }),
    // ];
    const columns = [
        // columnHelper.accessor('', {
        //     id: 'S.No',
        //     cell: (info) => <span>{info.row.index + 1}</span>,
        //     header: 'S.No',
        // }),
        ...Object.keys(data[0])?.map((field) => {
            return columnHelper.accessor(field, {
                cell: (info) => <span>{info.getValue()}</span>,
                header: camelToCapitalize(field),
            });
        }),
    ];

    // console.log(rawColumns);
    // const [data] = useState(() => [...USERS]);
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
    const [openAddExerciseModel, setOpenAddExerciseModel] = useState(false);
    return (
        <div className="p-2 max-w-8xl mx-auto text-white fill-gray-400">
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

                {isPT && (
                    <div>
                        <button
                            type="reset"
                            className="bg-red-700 text-white h-[40px] w-[120px] hover:border-3  px-2 hover:opacity-80"
                            onClick={() =>
                                setOpenAddExerciseModel((state) => !state)
                            }
                        >
                            + add Exercise
                        </button>
                    </div>
                )}
            </div>
            <table className="border border-gray-700 w-full text-left">
                <thead className="bg-red-800">
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
                ${i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
                `}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-3.5 py-2">
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
                            <td colSpan={12}>No Recoard Found!</td>
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
                        defaultValue={table.getState().pagination.pageIndex + 1}
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
            {openAddExerciseModel && (
                <UploadExercise
                    setOpenAddExerciseModel={setOpenAddExerciseModel}
                />
            )}
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
export default TanStackTable;
