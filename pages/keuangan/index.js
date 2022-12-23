import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Table from "@components/systems/Table";
import { PlusSmIcon } from "@heroicons/react/outline";
import Link from "next/link";
import LinkButton from "@components/systems/LinkButton";
import Badge from "@components/systems/Badge";
import Dialog from "@components/systems/Dialog";
import { useState } from "react";

const danaDesa = [
	{
		id: 1,
		tahun: 2010,
		jenis: 1,
		uraian: "Dana Desa",
		anggaran: 10000,
		realisasi: 5000
	},
	{
		id: 2,
		tahun: 2015,
		jenis: 2,
		uraian: "Dana Desa",
		anggaran: 20000,
		realisasi: 10000
	},
	{
		id: 3,
		tahun: 2020,
		jenis: 3,
		uraian: "Dana Desa",
		anggaran: 20000,
		realisasi: 15000
	},
]

export default function DanaDesa() {
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [data, setData] = useState()
	const filteredData = danaDesa.filter(dana => dana.id === data)[0]

	function handleDelete(id) {
		setOpenDeleteDialog(true)
		setData(id)
	}

	return (
		<Layout title="Dana Desa">

			<div className="flex flex-wrap justify-between items-center mb-6 gap-y-3">
				<Title>Dana Desa</Title>
				<LinkButton href="/keuangan" className="flex gap-2 items-center">
					<PlusSmIcon className="h-5 w-5" />Tambah
				</LinkButton>
			</div>

			<Table
				head={
					<>
						<Table.td shrink>No</Table.td>
						<Table.td>Tahun</Table.td>
						<Table.td>Jenis</Table.td>
						<Table.td>Uraian</Table.td>
						<Table.td>Anggaran</Table.td>
						<Table.td>Realisasi</Table.td>
						<Table.td>Aksi</Table.td>
					</>
				}
			>
				{danaDesa.map((item, index) =>
					<Table.tr key={index}>
						<Table.td shrink>{index + 1}</Table.td>
						<Table.td>
							{item.tahun}
						</Table.td>

						<Table.td>
							{item.jenis == 1 ? (
								<Badge.green>Pendapatan</Badge.green>
							) : item.jenis == 2 ? (
								<Badge.red>Belanja</Badge.red>
							) :
								<Badge.yellow>Pembiayaan</Badge.yellow>
							}
						</Table.td>
						<Table.td>
							{item.uraian}
						</Table.td>
						<Table.td>
							{item.anggaran}
						</Table.td>
						<Table.td>
							{item.realisasi}
						</Table.td>
						<Table.td className="flex">
							<Link href={`/keuangan`} className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600">
								Edit
							</Link>
							<button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600 ml-3">
								Hapus
							</button>
						</Table.td>
					</Table.tr>
				)}
			</Table>

			<Dialog
				title="Delete Confirmation"
				open={openDeleteDialog}
				showIcon
				isDanger
				setOpen={setOpenDeleteDialog}
				onClose={() => setOpenDeleteDialog(false)}
				onConfirm={() => {
					alert(`${filteredData.id} ${filteredData.tahun}`)
					setOpenDeleteDialog(false)
				}}
			>
				Sure want to delete {filteredData?.id} {filteredData?.tahun} ?
			</Dialog>

		</Layout>
	);
}