import { Button, Input } from "components";
import styles from "./index.module.scss";

interface Props {
	loading: boolean;
	page: number;
	setPage: (page: number) => void;
	info: any;
}

const Pagination: React.FC<Props> = ({ loading, page, setPage, info }) => {
	return (
		<div className={styles.pagination}>
			<Button onClick={() => setPage(page - 1)} disabled={!info?.prev || loading}>
				Prev
			</Button>
			<span>
				<Input
					type="number"
					defaultValue={page}
					label="Page:"
					setValue={setPage}
					max={info?.pages || 1}
				/>{" "}
				/ {info?.pages || 0}
			</span>
			<Button onClick={() => setPage(page + 1)} disabled={!info?.next || loading}>
				Next
			</Button>
		</div>
	);
};

export default Pagination;
