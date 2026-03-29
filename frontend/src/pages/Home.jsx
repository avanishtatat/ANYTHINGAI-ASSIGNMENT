import { useContext, useState } from "react";
import { useUserAuth } from "../customHooks/useUserAuth";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import CreateEditModal from "../components/CreateEditModal";
import useFetch from "../customHooks/useFetch";
import { createTask, deleteTask, getTasks, updateTask } from "../api/taskApi";
import toast from "react-hot-toast";
import { hasPermission } from "../utils/permission";
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "../utils/constants";

const Home = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  const userPermissions = user?.permissions ?? [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { loading, error, data, refetch } = useFetch(getTasks);
  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="text-center mt-8">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <p className="text-center mt-8 text-red-500">Failed to load tasks.</p>
      </div>
    );
  }

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSubmitTask = async (payload) => {
    try {
      let response;
      if (selectedTask) {
        response = await updateTask(selectedTask._id, payload);
      } else {
        response = await createTask(payload);
      }

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(
        response?.data?.message ?? "Operation successfully performed.",
      );
      await refetch();
      closeModal();
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await deleteTask(taskId);

      if (response.success) {
        toast.success(response.data.message);
        await refetch();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  if (!user) return null;
  return (
    <div>
      <Navbar />

      {hasPermission(userPermissions, CREATE_TASK) && (
        <div className="flex justify-end mt-4 px-4">
          <button
            className="px-4 py-2 bg-green-700 text-white cursor-pointer rounded"
            onClick={openCreateModal}
          >
            + Create Task
          </button>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-4 py-2">
          {data.map((task) => (
            <div key={task._id} className="bg-white px-4 py-2 rounded-md">
              <h2 className="text-xl font-bold">{task.title}</h2>
              <p className="text-sm text-gray-500">{task.description}</p>

              <div className="flex gap-2 justify-end mt-4">
                {hasPermission(userPermissions, UPDATE_TASK) && (
                  <button
                    className="px-2 py-1 bg-blue-500 rounded text-white cursor-pointer"
                    onClick={() => openEditModal(task)}
                  >
                    Edit
                  </button>
                )}
                {hasPermission(userPermissions, DELETE_TASK) && (
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="px-2 py-1 bg-red-700 rounded text-white cursor-pointer"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateEditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        task={selectedTask}
        onSubmit={handleSubmitTask}
      />
    </div>
  );
};

export default Home;
