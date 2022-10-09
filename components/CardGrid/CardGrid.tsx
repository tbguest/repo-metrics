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

const removeRepoFromDocument = async (id: string, session) => {
  if (!session) {
    return;
  }
  const response = await fetch(
    `/api/user/repos?id=${id}&userId=${session?.userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
};

const CardGrid = ({ session, data, loading, error, mutate }: Props) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return <h2>Failed to load data</h2>;
  }

  const handleDelete = async (id: string, data: object[], session) => {
    const updatedList = data.filter((element) => {
      return element.id !== id;
    });

    // optimistic UI
    mutate(updatedList, false);

    if (session) {
      removeRepoFromDocument(id, session);
      mutate();
    }
  };

  const repoCards = data.map((repo) => {
    return (
      <div className={styles.repocard} key={repo.id}>
        <div className={styles.close}>
          <button onClick={() => handleDelete(repo.id, data, session)}>
            Remove
          </button>
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
