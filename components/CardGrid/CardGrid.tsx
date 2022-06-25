import { CardLink } from "../../components/CardLink";
import classNames from "classnames";
import styles from "./CardGrid.module.css";
import { BarPlot } from "../../components/BarPlot";
import { AiFillStar } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues, VscRepoForked } from "react-icons/vsc";

type Props = {
  repo: any;
  open: any;
  onClick: any;
};

const CardGrid = ({ repo, open, onClick }: Props) => {
  const repoCards = Object.keys(repo).map((key, index) => {
    // TODO: handle the unsavoury typescript in here...
    return (
      <div
        className={classNames(styles.repocard, {
          [styles.repocard_clicked]: open[index],
        })}
        key={key}
      >
        <CardLink onClick={() => onClick(index)} open={open[index]}>
          <h2>{(repo as any)[key].nameWithOwner}</h2>
          <h3>{(repo as any)[key].description}</h3>
          <div className={styles.content}>
            <div className={styles.list}>
              <p>
                <AiFillStar /> stars:{" "}
                <strong>{(repo as any)[key].stargazerCount}</strong>
              </p>
              <p>
                <VscIssues /> issues (open):{" "}
                <strong>{(repo as any)[key].openIssues.totalCount}</strong>
              </p>
              <p>
                <VscRepoForked /> forks:{" "}
                <strong>{(repo as any)[key].forkCount}</strong>
              </p>
              <p>
                <BiGitPullRequest /> pull requests (open):{" "}
                <strong>{(repo as any)[key].pullRequests.totalCount}</strong>
              </p>
            </div>
            <div
              className={classNames(styles.plot, {
                [styles.plot_open]: open[index],
              })}
            >
              <div className={styles.chart}>
                {open[index] && (
                  <BarPlot name={(repo as any)[key].nameWithOwner} />
                )}
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
