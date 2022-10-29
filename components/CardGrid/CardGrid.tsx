import { Session } from "next-auth";
import { AiFillStar } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues, VscRepoForked } from "react-icons/vsc";
import { BarPlot } from "../../components/BarPlot";
import { Card } from "../../components/Card";
import { RepoData } from "../../models";
import { removeRepoFromDocument } from "../../db/updateDocument";
import styles from "./CardGrid.module.css";
import { useSession } from "next-auth/react";
import { KeyedMutator } from "swr";
import { IoIosTrash } from "react-icons/io";

type Props = {
  data: RepoData[];
  loading: boolean;
  error: boolean;
  mutate: KeyedMutator<RepoData[]>;
};

const CardGrid = ({ data, loading, error, mutate }: Props) => {
  const { data: session } = useSession();
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return <h2>Failed to load data</h2>;
  }

  const handleDelete = async (
    id: string,
    data: RepoData[],
    session: Session | null
  ) => {
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
          <button
            className={styles.button}
            onClick={() => handleDelete(repo.id, data, session)}
          >
            <IoIosTrash className={styles.icon} />
          </button>
        </div>
        <Card>
          <h2 className={styles.card_title}>
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
                <BiGitPullRequest /> pull requests (open): <strong>--</strong>
              </p>
            </div>
            <div className={styles.plot}>
              <div className={styles.chart}>
                <BarPlot name={repo.repo} owner={repo.owner} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  });

  return <div className={styles.grid}>{repoCards}</div>;
};

export { CardGrid };
