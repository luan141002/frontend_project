import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ExerciseService from '../../services/ExerciseService';
import { v4 as uuidv4 } from 'uuid';
import CrossIcon from '../Schedule/assets/icon-cross.svg';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadExercise = ({
    type,
    setOpenAddExerciseModel,
    setOpenEditExerciseModel,
    currentExercise,
}) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();

    const [success, setSuccess] = useState(false);
    const [defaultExercise, setDefaultExercise] = useState();
    const [exerciseCategories, setExerciseCategories] = useState();
    const [currentCategory, setCurrentCategory] = useState();
    const [steps, setSteps] = useState();

    const loadPage = async () => {
        try {
            if (type === 'edit') {
                const response = await ExerciseService.getExercise(
                    currentExercise,
                );
                console.log(response);
                setDefaultExercise(response);

                setSteps(response?.steps);
            }
            const categories = await ExerciseService.getCategories();
            setExerciseCategories(categories);
        } catch (err) {
            toast.error(`${type} Exercise failed`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    useEffect(() => {
        loadPage();
    }, []);

    const onSubmit = async (data) => {
        // Xử lý dữ liệu sau khi submit form

        try {
            if (type === 'add') {
                data['steps'] = newColumns;
                console.log(data);
                const response = await ExerciseService.addExercise(data);
                console.log(response);
                // setSuccess(true);
                toast.success(`${type} Exercise Successfully`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setOpenAddExerciseModel(false);
            } else {
                // data['steps'] = steps
                const formData = {
                    category: {
                        id:
                            data.category.id !== ''
                                ? data.category.id
                                : exerciseCategories.find(
                                      (category) =>
                                          category.name ===
                                          defaultExercise.category,
                                  ).id,
                    },
                    description:
                        data.description !== ''
                            ? data.description
                            : defaultExercise.description,
                    equipment:
                        data.equipment !== ''
                            ? data.equipment
                            : defaultExercise.equipment,
                    experienceLevel:
                        data.experienceLevel !== ''
                            ? data.experienceLevel
                            : defaultExercise.experienceLevel,
                    forceType:
                        data.forceType !== ''
                            ? data.forceType
                            : defaultExercise.forceType,
                    name: data.name !== '' ? data.name : defaultExercise.name,
                    secondaryMuscles:
                        data.secondaryMuscles !== ''
                            ? data.secondaryMuscles
                            : defaultExercise.secondaryMuscles,
                    steps:
                        data.steps && data.steps.length > 0
                            ? [...steps]
                            : defaultExercise.steps,
                    targetMuscleGroup:
                        data.targetMuscleGroup !== ''
                            ? data.targetMuscleGroup
                            : defaultExercise.targetMuscleGroup,
                    type: data.type !== '' ? data.type : defaultExercise.type,
                    videos:
                        data.videos && data.videos.length > 0
                            ? [...data.videos]
                            : defaultExercise.videos,
                };

                const response = await ExerciseService.editExercise(
                    currentExercise,
                    formData,
                );
                console.log(response);
                setSuccess(true);
                toast.success(`${type} Exercise successfully`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }

            // if (response != null) {
            //     setOpenAddExerciseModel(false);
            // }
            // navigate('/');
        } catch (err) {
            toast.error(`${type} Exercise failed`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    const [newColumns, setNewColumns] = useState([
        {
            serial: 1,
            content: 'Push up',
        },
        {
            serial: 2,
            content: 'pull up',
        },
    ]);
    // handle column input
    const onNewColumnInputChange = (id, newValue) => {
        if (type === 'add') {
            setNewColumns((prevState) => {
                const newState = [...prevState];
                const column = newState.find((col) => col.serial === id);
                console.log(column);
                column.content = newValue;
                return newState;
            });
        } else {
            setSteps((prevState) => {
                const newState = [...prevState];
                const column = newState.find((col) => col.id === id);
                column.content = newValue;
                return newState;
            });
        }
    };
    const onDelete = (id) => {
        setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
    };
    return (
        <div
            className="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll z-50"
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                if (type === 'add') {
                    setOpenAddExerciseModel(false);
                } else {
                    setOpenEditExerciseModel(false);
                }
            }}
        >
            <div
                className=" scrollbar-hide overflow-y-scroll max-h-[95vh]
             text-black font-bold shadow-md shadow-[#364e7e1a]
                max-w-4xl mx-auto w-full px-1  rounded-xl flex justify-center h-screen box-border bg-white"
            >
                <div className="w-full bg-white p-3 mt-8 ">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full mx-auto  p-4 "
                    >
                        <div className="text-gray-700 flex flex-col self-start mb-[5%] mt-4">
                            <label className="text-[30px] font-bold capitalize">
                                {type} Exercises
                            </label>
                            <p className="text-gray-700 text-[15px] font-thin italic capitalize">
                                {type} Exercise
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-[48%]">
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        defaultValue={defaultExercise?.name}
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        {...register(
                                            'name',
                                            type === 'edit'
                                                ? {}
                                                : {
                                                      required:
                                                          'This field is required',
                                                  },
                                        )}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="youtubeFront"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Link Frontside Video
                                    </label>
                                    <input
                                        type="text"
                                        id="videoUrls[0].link"
                                        name="videoUrls[0].link"
                                        defaultValue={
                                            defaultExercise?.videoUrls[0]
                                        }
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        {...register(
                                            'videos[0].link',
                                            type === 'edit'
                                                ? {}
                                                : {
                                                      required:
                                                          'This field is required',
                                                  },
                                        )}
                                    />
                                    <input
                                        type="text"
                                        name="videoUrls[0].title"
                                        value="frontSide video"
                                        hidden
                                        {...register('videos[0].title')}
                                    />
                                    {errors.videos && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.videos.message}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="youtubeBack"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Link Backside Video
                                    </label>
                                    <input
                                        type="text"
                                        id="videoUrls[1].link"
                                        name="videoUrls[1].link"
                                        defaultValue={
                                            defaultExercise?.videoUrls[1]
                                        }
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        {...register(
                                            'videos[1].link',
                                            type === 'edit'
                                                ? {}
                                                : {
                                                      required:
                                                          'This field is required',
                                                  },
                                        )}
                                    />
                                    <input
                                        type="text"
                                        name="videoUrls[1].title"
                                        value="backSide video"
                                        hidden
                                        {...register('videos[1].title')}
                                    />
                                    {errors.videos && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.videos.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-600 ">
                                        Steps
                                    </label>
                                    {type === 'add' &&
                                        newColumns.map((column, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center w-full"
                                            >
                                                <div>
                                                    <label className="block text-sm font-normal text-gray-600 italic">
                                                        Step {index + 1}:
                                                    </label>
                                                    <input
                                                        className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border
                                        border-gray-600 outline-none focus:outline-[#735fc7]"
                                                        value={column.content}
                                                        onChange={(e) => {
                                                            onNewColumnInputChange(
                                                                column.serial,
                                                                e.target.value,
                                                            );
                                                        }}
                                                        type="text"
                                                    />
                                                </div>
                                                <img
                                                    src={CrossIcon}
                                                    className="cursor-pointer m-4"
                                                    onClick={() => {
                                                        onDelete(column.id);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    {type === 'edit' &&
                                        steps?.map((column, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center w-full"
                                            >
                                                <div>
                                                    <label className="block text-sm font-normal text-gray-600 italic">
                                                        Step {index + 1}:
                                                    </label>
                                                    <input
                                                        className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border
                                        border-gray-600 outline-none focus:outline-[#735fc7]"
                                                        value={column.content}
                                                        onChange={(e) => {
                                                            onNewColumnInputChange(
                                                                column.id,
                                                                e.target.value,
                                                            );
                                                        }}
                                                        type="text"
                                                    />
                                                </div>
                                                <img
                                                    src={CrossIcon}
                                                    className="cursor-pointer m-4"
                                                    onClick={() => {
                                                        onDelete(column.id);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    <button
                                        className="w-[80%] items-center hover:opacity-75 text-white bg-red-700 mt-2 py-2 "
                                        onClick={() => {
                                            if (type === 'add') {
                                                setNewColumns(
                                                    (state, index) => [
                                                        ...state,
                                                        {
                                                            serial:
                                                                state.length +
                                                                1,
                                                            content: '',
                                                        },
                                                    ],
                                                );
                                            } else {
                                                setSteps((state, index) => [
                                                    ...state,
                                                    {
                                                        serial:
                                                            state.length + 1,
                                                        content: '',
                                                    },
                                                ]);
                                            }
                                        }}
                                        type="button"
                                    >
                                        + Add new step
                                    </button>
                                </div>
                            </div>

                            <div className="w-[48%]">
                                <div className="mb-4">
                                    <label
                                        htmlFor="exerciseType"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Exercise Type
                                    </label>
                                    <select
                                        id="exerciseType"
                                        name="type"
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        defaultValue={
                                            defaultExercise?.forceType
                                        }
                                        {...register(
                                            'type',
                                            type === 'edit'
                                                ? {}
                                                : {
                                                      required:
                                                          'This field is required',
                                                  },
                                        )}
                                    >
                                        <option value="">
                                            Select Exercise Type
                                        </option>
                                        <option
                                            value="Scardio"
                                            selected={
                                                defaultExercise?.type ===
                                                'Cardio'
                                            }
                                        >
                                            Cardio
                                        </option>
                                        <option
                                            value="Strength"
                                            selected={
                                                defaultExercise?.type ===
                                                'Strength'
                                            }
                                        >
                                            Strength
                                        </option>
                                        {/* Thêm các option khác tương tự */}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="category"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name="category.id"
                                        defaultValue={defaultExercise?.category}
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        {...register(
                                            'category.id',
                                            type === 'edit'
                                                ? {}
                                                : {
                                                      required:
                                                          'This field is required',
                                                  },
                                        )}
                                    >
                                        <option value="">
                                            Select Exercise Category
                                        </option>
                                        {exerciseCategories?.map(
                                            (category, index) => {
                                                return (
                                                    <option
                                                        value={+category.id}
                                                        selected={
                                                            defaultExercise?.category ===
                                                            category.name
                                                        }
                                                    >
                                                        {category.name}
                                                    </option>
                                                );
                                            },
                                        )}
                                        {/* <option value={1}>Shoulder</option>
                                        <option value={2}>Leg</option> */}
                                        {/* Thêm các option khác tương tự */}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="targetMuscleGroup"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Target Muscle Group
                                    </label>
                                    <input
                                        type="text"
                                        id="targetMuscleGroup"
                                        name="targetMuscleGroup"
                                        defaultValue={defaultExercise?.category}
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        {...register(
                                            'targetMuscleGroup',
                                            type === 'edit'
                                                ? {}
                                                : {
                                                      required:
                                                          'This field is required',
                                                  },
                                        )}
                                    />
                                    {errors.targetMuscleGroup && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.targetMuscleGroup.message}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="equipment"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Equipment Required
                                    </label>
                                    <input
                                        type="text"
                                        id="equipment"
                                        name="equipment"
                                        defaultValue={
                                            defaultExercise?.equipment
                                        }
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        {...register(
                                            'equipment',
                                            type === 'edit'
                                                ? {}
                                                : {
                                                      required:
                                                          'This field is required',
                                                  },
                                        )}
                                    />
                                    {errors.equipment && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.equipment.message}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="forceType"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Force Type
                                    </label>
                                    <input
                                        type="text"
                                        id="forceType"
                                        name="forceType"
                                        defaultValue={
                                            defaultExercise?.forceType
                                        }
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        {...register(
                                            'forceType',
                                            type === 'edit'
                                                ? {}
                                                : {
                                                      required:
                                                          'This field is required',
                                                  },
                                        )}
                                    />
                                    {errors.forceType && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.forceType.message}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="experienceLevel"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Experience Level
                                    </label>
                                    <select
                                        id="experienceLevel"
                                        name="experienceLevel"
                                        defaultValue={
                                            defaultExercise?.experienceLevel
                                        }
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        {...register(
                                            'experienceLevel',
                                            type === 'edit'
                                                ? {}
                                                : {
                                                      required:
                                                          'This field is required',
                                                  },
                                        )}
                                    >
                                        <option value="">
                                            Select Experience Level
                                        </option>
                                        <option
                                            value="beginner"
                                            selected={
                                                defaultExercise?.experienceLevel ===
                                                'Beginner'
                                            }
                                        >
                                            Beginner
                                        </option>
                                        <option
                                            value="intermediate"
                                            selected={
                                                defaultExercise?.experienceLevel ===
                                                'Intermediate'
                                            }
                                        >
                                            Intermediate
                                        </option>
                                        <option
                                            value="advanced"
                                            selected={
                                                defaultExercise?.experienceLevel ===
                                                'Advanced'
                                            }
                                        >
                                            Advanced
                                        </option>
                                    </select>
                                    {errors.experienceLevel && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.experienceLevel.message}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="secondaryMuscles"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Secondary Muscles
                                    </label>
                                    <input
                                        type="text"
                                        id="secondaryMuscles"
                                        name="secondaryMuscles"
                                        defaultValue={
                                            defaultExercise?.secondaryMuscles
                                        }
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        {...register('secondaryMuscles')}
                                    />
                                    {errors.secondaryMuscles && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.secondaryMuscles.message}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Exercise Overview
                                    </label>
                                    <textarea
                                        type="text"
                                        id="description"
                                        name="description"
                                        defaultValue={
                                            defaultExercise?.description
                                        }
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        {...register('description')}
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>
                                {/* <div className="mb-4">
                                    <label
                                        htmlFor="picture"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Exercise Thumbnail
                                    </label>
                                    <input
                                        {...register('picture', {
                                            required:
                                                'Recipe picture is required',
                                        })}
                                        type="file"
                                        id="picture"
                                    />
                                    {errors.picture && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.picture.message}
                                        </p>
                                    )}
                                </div> */}
                            </div>
                        </div>
                        <div className="flex w-full justify-center space-x-3 mt-[100px]">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-green-700 box-border text-white h-[40px] w-[120px] hover:border-3  hover:hover:opacity-80"
                            >
                                Submit
                            </button>
                            <button
                                type="reset"
                                className="bg-red-700 text-white h-[40px] w-[120px] hover:border-3  hover:opacity-80"
                            >
                                Cancel
                            </button>
                            {success && (
                                <p className="text-green-800 text-xs mt-1">
                                    Add Exercise Successfully
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UploadExercise;
