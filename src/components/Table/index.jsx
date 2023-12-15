import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { USERS } from './data.js';
import { useState, useEffect, useMemo } from 'react';
import DebouncedInput from './DebouncedInput';
import UploadExercise from '../../pages/UploadExcercise';
import AddEditTrainer from '../../pages/AddTrainer/index.js';
import { useDispatch, useSelector } from 'react-redux';
import MemberService from '../../services/MemberService.js';
import ExerciseService from '../../services/ExerciseService.js';
import AddTrainer from '../../pages/AddTrainer/index.js';
import { useFormState } from 'react-hook-form';
import DeleteModal from '../../pages/Schedule/modals/DeleteModal.js';
import SubTable from './SubTable.js';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TanStackTable = ({ type }) => {
    const columnHelper = createColumnHelper();
    const account = useSelector((state) => state.account);
    const isPT = account.roles[0]?.name === 'PERSONAL_TRAINER' ? true : false;
    const isAdmin = account.roles[0]?.name === 'ADMIN' ? true : false;

    const [currentExercise, setCurrentExercise] = useState();
    const [currentTrainer, setCurrentTrainer] = useState();

    const [loadTablePage, setLoadTablePage] = useState(0);
    const [openMemberOfPTModal, setOpenMemberOfPTModal] = useState(false);

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
            case 'members':
                return [
                    {
                        personalLevel: '',
                        firstName: '',
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
                        firstName: 'string',
                        ptLevel: 'string',
                        email: 'string',
                        activated: true,
                    },
                ];
                break;
            case 'exercises':
                return [
                    {
                        name: '',
                        experience: '',
                        equipment: '',
                        secondaryMuscles: '',
                        type: '',
                        steps: 0,
                        category: '',
                        tips: '',
                        edit: '',
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
                        account?.memberId,
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
                case 'members':
                    result = await MemberService.getMembers();

                    if (result.length !== 0) {
                        const processedResults = result.map((element) => ({
                            personalLevel: element.personalLevel,
                            firstName: element.firstName,
                            memberLevel: element.memberLevel,
                            Email: element.user.email,
                            Activated: element.user.activated.toString(),
                            edit: element.id,
                        }));

                        console.log(processedResults);
                        setData([...processedResults]);
                    }
                    break;
                case 'pts':
                    result = await MemberService.getPTs();
                    let processedResults;
                    if (result.length !== 0) {
                        if (isPT) {
                            processedResults = result.map((element) => ({
                                firstName: element.firstName,
                                ptLevel: element.ptLevel,
                                email: element.user.email,
                                activated: element.user.activated.toString(),
                                edit: element.id,
                            }));
                        } else {
                            processedResults = result.map((element) => ({
                                firstName: element.firstName,
                                ptLevel: element.ptLevel,
                                email: element.user.email,
                                activated: element.user.activated.toString(),
                                edit: element.id,
                            }));
                        }

                        console.log(processedResults);
                        setData([...processedResults]);
                    }
                    break;
                case 'exercises':
                    result = await ExerciseService.getExercises({
                        limit: 60,
                    });
                    const realResult = result.filter(
                        (exercise) => exercise.status !== 'REMOVED',
                    );
                    if (realResult.length !== 0) {
                        const processedResults = realResult.map((element) => ({
                            name: element.name,
                            experience: element.experienceLevel,
                            equipment: element.equipment,
                            secondaryMuscles: element.secondaryMuscles,
                            type: element.type,
                            steps: element.steps.length,
                            category: element.category,
                            tips: element.tips,
                            edit: element.id,
                        }));

                        console.log(processedResults);
                        setData([...processedResults]);
                    }
                    break;
                case 'membersOfPT':
                    result = await MemberService.getMembersByPTId(
                        account.memberId,
                    );

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
                default:
                    break;
            }
        } catch (err) {
            toast.error('Failed', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    useMemo(() => {
        loadPage();
    }, [type, loadTablePage]);

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
        columnHelper.accessor('', {
            id: 'No',
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: 'No',
        }),
        ...Object.keys(data[0])
            ?.map((field) => {
                return columnHelper.accessor(field, {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: camelToCapitalize(field),
                });
            })
            .filter((field) => field.header !== 'Edit'),
        columnHelper.accessor('edit', {
            id: 'Edit',
            cell: (info) => (
                <div>
                    {isPT && type === 'exercises' && (
                        <div className="flex justify-center space-x-3 ">
                            <button
                                type="button"
                                className="bg-green-700  text-white h-[30px] w-[90px] hover:border-3  hover:hover:opacity-80"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (type === 'exercises') {
                                        setCurrentExercise(info.getValue());
                                        setOpenEditExerciseModel(
                                            (state) => !state,
                                        );
                                    }
                                }}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="bg-gray-700 text-white h-[30px] w-[90px] hover:border-3  hover:opacity-80"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (type === 'exercises') {
                                        setCurrentExercise(info.getValue());
                                        setOpenDeleteExerciseModal(
                                            (state) => !state,
                                        );
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                    {isAdmin && type === 'pts' && (
                        <div className="flex justify-center space-x-3 ">
                            <button
                                type="button"
                                className="bg-green-700  text-white h-[30px] w-[90px] hover:border-3  hover:hover:opacity-80"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (type === 'pts') {
                                        setCurrentTrainer(info.getValue());
                                        setOpenMemberOfPTModal(true);
                                    }
                                }}
                            >
                                View Members
                            </button>
                            <button
                                type="button"
                                className="bg-gray-700 text-white h-[30px] w-[90px] hover:border-3  hover:opacity-80"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (type === 'pts') {
                                        setCurrentTrainer(info.getValue());
                                        setOpenDeleteTrainerModal(
                                            (state) => !state,
                                        );
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ),
            header:
                (isPT && type === 'exercises') || (isAdmin && type === 'pts')
                    ? 'Edit'
                    : '',
        }),
    ];

    console.log(columns);
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
    const [openEditExerciseModel, setOpenEditExerciseModel] = useState(false);
    const [openAddTrainerModal, setOpenAddTrainerModal] = useState(false);
    const [openEditTrainerModal, setOpenEditTrainerModal] = useState(false);

    const [openDeleteExerciseModal, setOpenDeleteExerciseModal] =
        useState(false);
    const [openDeleteTrainerModal, setOpenDeleteTrainerModal] = useState(false);
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

                {isPT && type === 'exercises' && (
                    <div>
                        <button
                            type="reset"
                            className="bg-red-700 text-white h-[40px] w-[120px] hover:border-3  px-2 hover:opacity-80"
                            onClick={() =>
                                setOpenAddExerciseModel((state) => !state)
                            }
                        >
                            Add Exercise
                        </button>
                    </div>
                )}
                {isAdmin && type === 'pts' && (
                    <div>
                        <button
                            type="reset"
                            className="bg-red-700 text-white h-[60px] w-[150px] hover:border-3  px-2 hover:opacity-80"
                            onClick={() =>
                                setOpenAddTrainerModal((state) => !state)
                            }
                        >
                            Add Personal Trainer
                        </button>
                    </div>
                )}
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
                    type="add"
                    setOpenAddExerciseModel={setOpenAddExerciseModel}
                />
            )}
            {openEditExerciseModel && (
                <UploadExercise
                    type="edit"
                    currentExercise={currentExercise}
                    setOpenEditExerciseModel={setOpenEditExerciseModel}
                />
            )}
            {openAddTrainerModal && (
                <AddEditTrainer
                    setLoadTablePage={setLoadTablePage}
                    type="add"
                    setOpenAddTrainerModal={setOpenAddTrainerModal}
                />
            )}
            {openEditTrainerModal && (
                <AddEditTrainer
                    currentTrainer={currentTrainer}
                    setLoadTablePage={setLoadTablePage}
                    type="edit"
                    setOpenEditTrainerModal={setOpenEditTrainerModal}
                />
            )}
            {openDeleteExerciseModal && (
                <DeleteModal
                    type="exercise"
                    currentExercise={currentExercise}
                    setLoadTablePage={setLoadTablePage}
                    setOpenDeleteExerciseModal={setOpenDeleteExerciseModal}
                />
            )}
            {openDeleteTrainerModal && (
                <DeleteModal
                    type="pt"
                    currentTrainer={currentTrainer}
                    setLoadTablePage={setLoadTablePage}
                    setOpenDeleteTrainerModal={setOpenDeleteTrainerModal}
                />
            )}
            {openMemberOfPTModal && (
                <SubTable
                    ptId={currentTrainer}
                    setOpenMemberOfPTModal={setOpenMemberOfPTModal}
                />
            )}
            <div className="toast-container">
                <ToastContainer limit={2} />
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
export default TanStackTable;
