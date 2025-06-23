import styles from "./page.module.css"
type Props = {
	name:string,
	address:string,
	business_hours:string,
	details:string
}
export default function StoreCards  ({StoreInfo}:{StoreInfo : Props[]}) {
	return (
		<div>
					<div className={styles.cards}>
			{StoreInfo.map((value,index) => {
				return (
					<div key={index} className={styles.card}>
						<p className={styles.address}>{value.address}</p>
						<p className={styles.business_hours}>{value.business_hours}</p>
						<p className={styles.name}>{value.name}</p>
						<p className={styles.details}>{value.details}</p>
					</div>
				)
			})}
		</div>
		</div>
	)
}