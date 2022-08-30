import classNames from "classnames";
import { AiFillStar } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues, VscRepoForked } from "react-icons/vsc";
import { BarPlot } from "../../components/BarPlot";
import { CardLink } from "../../components/CardLink";
import { Repo } from "../../models";
import styles from "./CardGrid.module.css";
import { mutate } from "swr";

type Props = {
  // repoData: Repo[];
  list: string[];
  repoData: any;
  loading: boolean;
};

const CardGrid = ({ list, repoData, loading }: Props) => {
  if (repoData === "loading") {
    // if (loading === "loading") {
    return <h2>Loading...</h2>;
  }

  if (repoData === "error") {
    // if (loading === "error") {
    // console.error(error);
    return null;
  }

  const handleDelete = async (id: string, list: string[]) => {
    const updatedList = list.filter((item: any) => {
      return item.node_id != id;
    });

    const response = await fetch(`/api/repositories?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    mutate("/api/repositories");
  };

  if (
    !repoData ||
    repoData.length === 0 ||
    repoData.error === "Could not resolve to a node with the global id of ''"
  ) {
    return null;
  }

  const repoCards = repoData?.data.nodes.map((repo: Repo, index: any) => {
    return (
      <div className={styles.repocard} key={repo.id}>
        <div className={styles.close}>
          <button onClick={() => handleDelete(repo.id, list)}>Remove</button>
        </div>
        <CardLink>
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
            <div className={styles.plot}>
              <div className={styles.chart}>
                <BarPlot name={repo.nameWithOwner} />
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
