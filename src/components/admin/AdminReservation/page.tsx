'use client'
import styles from "./page.module.css"

const ReserveInfo = [
	{
		reservedAt:"2025-06-01",
		visitDate:"2025-06-10",
		storeName:"花屋",
		user:"山田太郎"
	},
		{
		reservedAt:"2025-06-01",
		visitDate:"2025-06-10",
		storeName:"花屋",
		user:"user1"
	},
		{
		reservedAt:"2025-06-01",
		visitDate:"2025-06-10",
		storeName:"花屋",
		user:"user2"
	},
		{
		reservedAt:"2025-06-01",
		visitDate:"2025-06-10",
		storeName:"花屋",
		user:"user3"
	},
		{
		reservedAt:"2025-06-01",
		visitDate:"2025-06-10",
		storeName:"花屋",
		user:"user4"
	},
		{
		reservedAt:"2025-06-01",
		visitDate:"2025-06-10",
		storeName:"花屋",
		user:"uset5"
	},
			{
		reservedAt:"2025-06-01",
		visitDate:"2025-06-10",
		storeName:"花屋",
		user:"user6"
	},
		{
		reservedAt:"2025-06-01",
		visitDate:"2025-06-10",
		storeName:"花屋",
		user:"user7"
	},
			{
		reservedAt:"2025-06-01",
		visitDate:"2025-06-10",
		storeName:"花屋",
		user:"user8"
	},
		{
		reservedAt:"2025-06-01",
		visitDate:"2025-06-10",
		storeName:"花屋",
		user:"user9"
	},
			{
		reservedAt:"2025-06-01",
		visitDate:"2025-06-10",
		storeName:"花屋",
		user:"user10"
	},
		{
		reservedAt:"2025-06-01",
		visitDate:"2025-06-10",
		storeName:"花屋",
		user:"user11"
	},
]

export default function AdminReservation  () {
			return (
		<div className={styles.recordBBox}>
			<h2>今までの予約件数:<span>{ReserveInfo.length}</span></h2>
			<div className={styles.container}>
				<div className={styles.header}>
					<span>利用日</span>
					<span>予約日</span>
					<span>利用者</span>
					<span>店舗名</span>
					<span>キャンセル</span>
				</div>
				<div className={styles.rowList}>
{ReserveInfo.map((value,index) => {
					return (
						<div key={index} className={styles.row}>
							<span>{value.visitDate}</span>
							<span>{value.reservedAt}</span>
							<span>{value.user}</span>
							<span>{value.storeName}</span>
							<button onClick={() => console.log("キャンセル")}>キャンセル</button>
						</div>
					)
				})}
				</div>
			</div>
		</div>
	)
}