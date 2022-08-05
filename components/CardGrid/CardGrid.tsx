import classNames from "classnames";
import { AiFillStar } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues, VscRepoForked } from "react-icons/vsc";
import { BarPlot } from "../../components/BarPlot";
import { CardLink } from "../../components/CardLink";
import { Repo } from "../../models";
import styles from "./CardGrid.module.css";

type Props = {
  // repoData: Repo[];
  repoData: any;
  loading: String;
  open: boolean[];
  onClick: (index: number) => void;
};

const CardGrid = ({ repoData, loading, open, onClick }: Props) => {
  if (repoData === "loading") {
    // if (loading === "loading") {
    return <h2>Loading...</h2>;
  }

  if (repoData === "error") {
    // if (loading === "error") {
    // console.error(error);
    return null;
  }

  const repoCards = repoData.map((repo: Repo, index: any) => {
    return (
      <div
        className={classNames(styles.repocard, {
          [styles.repocard_clicked]: open[index],
        })}
        key={repo.id}
      >
        <CardLink onClick={() => onClick(index)} open={open[index]}>
          <h2>{repo.nameWithOwner}</h2>
          <h3>{repo.description}</h3>
          <div className={styles.content}>
            <div className={styles.list}>
              <p>
                <AiFillStar /> stars: <strong>{repo.stargazerCount}</strong>
              </p>
              <p>
                <VscIssues /> issues (open):{" "}
                <strong>{repo.openIssues.totalCount}</strong>
              </p>
              <p>
                <VscRepoForked /> forks: <strong>{repo.forkCount}</strong>
              </p>
              <p>
                <BiGitPullRequest /> pull requests (open):{" "}
                <strong>{repo.pullRequests.totalCount}</strong>
              </p>
            </div>
            <div
              className={classNames(styles.plot, {
                [styles.plot_open]: open[index],
              })}
            >
              <div className={styles.chart}>
                {open[index] && <BarPlot name={repo.nameWithOwner} />}
              </div>
            </div>
          </div>
        </CardLink>
      </div>
    );
  });

  return <div className={styles.grid}>{repoCards}</div>;
};

export { CardGrid };
