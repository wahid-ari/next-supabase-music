import { useState } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import useToast from "@utils/useToast";
import { PlusSmIcon } from "@heroicons/react/outline";
import Layout from "@components/layout/Layout";
import TableSimple from "@components/systems/TableSimple";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import Dialog from "@components/systems/Dialog";
import Button from "@components/systems/Button";
import LabeledInput from "@components/systems/LabeledInput";

const fetcher = url => axios.get(url).then(res => res.data)

export default function Genre() {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/genre`, fetcher)
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [name, setName] = useState("")
  const [editItem, setEditItem] = useState({ id: null, name: "" })
  const [deleteItem, setDeleteItem] = useState({ id: null, name: "" })

  async function handleCreate() {
    const toastId = pushToast({
      message: "Saving Genre...",
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.API_ROUTE}/api/genre`, { name: name })
      if (res.status == 200) {
        setOpenCreateDialog(false)
        setName("")
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error)
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/genre`)
    }
  }

  async function handleEdit() {
    const toastId = pushToast({
      message: "Saving Genre...",
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.API_ROUTE}/api/genre`, editItem)
      if (res.status == 201) {
        setOpenEditDialog(false)
        setEditItem({ id: null, name: "" })
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error)
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/genre`)
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: "Deleting Genre...",
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.API_ROUTE}/api/genre`, { data: deleteItem.id })
      if (res.status == 200) {
        setOpenDeleteDialog(false)
        setDeleteItem({ id: null, name: "" })
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error)
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/genre`)
    }
  }

  function handleShowEditModal(id, name) {
    setEditItem({ id: id, name: name })
    setOpenEditDialog(true)
  }

  function handleShowDeleteModal(id, name) {
    setDeleteItem({ id: id, name: name })
    setOpenDeleteDialog(true)
  }

  if (error) {
    return (
      <Layout title="Genre">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Genre">

      <div className="flex flex-wrap justify-between items-center mb-6 gap-y-3">
        <Title>Genre</Title>
        <Button.success onClick={() => setOpenCreateDialog(true)} className="flex gap-2 items-center">
          <PlusSmIcon className="h-5 w-5" />Add Genre
        </Button.success>
      </div>

      <Dialog
        title="Create Genre"
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onConfirm={handleCreate}
        confirmText="Save"
      >
        <div className="mt-5">
          <LabeledInput label="Name" type="text" name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pop"
          />
        </div>
      </Dialog>

      <Dialog
        title="Edit Genre"
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onConfirm={handleEdit}
        confirmText="Update"
        isEdit
      >
        <div className="mt-5">
          <LabeledInput label="Name" type="text" name="name"
            value={editItem.name}
            onChange={(e) =>
              setEditItem({ ...editItem, name: e.target.value })
            }
          />
        </div>
      </Dialog>

      <Dialog
        title="Delete Genre"
        open={openDeleteDialog}
        isDanger
        setOpen={setOpenDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      >
        <div className="mt-5">
          Are you sure want to delete genre <span className="font-semibold">{deleteItem.name}</span> ?
        </div>
      </Dialog>

      {data ?
        <TableSimple
          head={
            <>
              <TableSimple.td small>No</TableSimple.td>
              <TableSimple.td>Name</TableSimple.td>
              <TableSimple.td small>Action</TableSimple.td>
            </>
          }
        >
          {data.map((item, index) => {
            return (
              <TableSimple.tr key={index}>
                <TableSimple.td small>{index + 1}</TableSimple.td>
                <TableSimple.td>{item.name}</TableSimple.td>
                <TableSimple.td>
                  <Button className="!py-[2px] !px-[6px] mr-2"
                    onClick={() => handleShowEditModal(item.id, item.name)}>
                    Edit
                  </Button>
                  <Button.danger className="!py-[2px] !px-[6px]"
                    onClick={() => handleShowDeleteModal(item.id, item.name)}>
                    Delete
                  </Button.danger>
                </TableSimple.td>
              </TableSimple.tr>
            );
          })}
        </TableSimple>
        :
        <Shimer className="h-24" />
      }

    </Layout>
  );
}