import { Session } from "next-auth";
import { AiFillStar } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues, VscRepoForked } from "react-icons/vsc";
import { BarPlot } from "../../components/BarPlot";
import { Card } from "../../components/Card";
import { RepoData } from "../../models";
import { removeRepoFromDocument } from "../../db/updateDocument";
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
      removeRepoFromDocument(id, session.user.id);
      mutate();
    }
  };

  const repoCards = data.map((repo) => {
    return (
      <div className="relative" key={repo.id}>
        <div className="absolute top-4 right-4">
          <button
            className="flex items-center justify-center w-8 h-8"
            onClick={() => handleDelete(repo.id, data, session)}
          >
            <IoIosTrash className="w-2/3 h-2/3" />
          </button>
        </div>
        <Card>
          <h2 className="break-words font-bold text-2xl py-6">
            {repo.owner}/{repo.repo}
          </h2>
          <h3 className="font-bold text-lg pb-2">{repo.description}</h3>
          <div className="flex flex-col">
            {/* <div className={styles.list}> */}
            <div className="grid grid-cols-2 grid-rows-2w-full mb-4">
              <p className="flex items-center gap-1 m-2 break-words">
                <AiFillStar /> stars: <strong>{repo.starGazers}</strong>
              </p>
              <p className="flex items-center gap-1 m-2 break-words">
                <VscIssues /> issues (open): <strong>{repo.issues}</strong>
              </p>
              <p className="flex items-center gap-1 m-2 break-words">
                <VscRepoForked /> forks: <strong>{repo.forks}</strong>
              </p>
              <p className="flex items-center gap-1 m-2 break-words">
                <BiGitPullRequest /> pull requests (open): --
              </p>
            </div>
            <div>
              <div className="w-full">
                <BarPlot name={repo.repo} owner={repo.owner} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-auto grid-rows-1 gap-10">{repoCards}</div>
  );
};

export { CardGrid };
