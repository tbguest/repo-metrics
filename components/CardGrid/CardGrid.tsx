import classNames from "classnames";
import { AiFillStar } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues, VscRepoForked } from "react-icons/vsc";
import { BarPlot } from "../../components/BarPlot";
import { CardLink } from "../../components/CardLink";
// import { Repo } from "../../models";
import styles from "./CardGrid.module.css";

type Props = {
  session: any;
  data: any;
  loading: boolean;
  error: boolean;
  mutate: any;
};

const CardGrid = ({ session, data, loading, error, mutate }: Props) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return <h2>Failed to load data</h2>;
  }

  const handleDelete = async (id: string, data: object[]) => {
    const updatedList = data.filter((element) => {
      return element.id != id;
    });

    console.log("updatedList", updatedList);

    // optimistic UI
    mutate(updatedList, false);

    if (session) {
      const response = await fetch(`/api/repos?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      mutate();
    }
  };

  const repoCards = data.map((repo) => {
    return (
      <div className={styles.repocard} key={repo.id}>
        <div className={styles.close}>
          <button onClick={() => handleDelete(repo.id, data)}>Remove</button>
        </div>
        <CardLink>
          <h2>
            {repo.owner}/{repo.repo}
          </h2>
          <h3>{repo.description}</h3>
          <div className={styles.content}>
            <div className={styles.list}>
              <p>
                <AiFillStar /> stars: <strong>{repo.starGazers}</strong>
              </p>
              <p>
                <VscIssues /> issues (open): <strong>{repo.issues}</strong>
              </p>
              <p>
                <VscRepoForked /> forks: <strong>{repo.forks}</strong>
              </p>
              <p>
                <BiGitPullRequest /> watchers: <strong>{repo.watchers}</strong>
              </p>
            </div>
            <div className={styles.plot}>
              <div className={styles.chart}>
                <BarPlot name={repo.repo} owner={repo.owner} />
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
