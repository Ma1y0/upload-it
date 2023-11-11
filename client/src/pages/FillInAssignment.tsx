import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Assignment } from "../lib/auth-state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

export default function FillInAssignment() {
  const { id } = useParams();

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [filesCount, setFilesCount] = useState(1);
  const [filesInput, setFilesInput] = useState<JSX.Element[]>();
  const [files, setFiles] = useState<File[]>([]);
  const [loadding, setLoadding] = useState(false);

  // Creates files inputs
  useEffect(() => {
    setFilesInput(
      Array.from({ length: filesCount }, (_, index) => (
        <input
          key={index}
          name={`file-${index}`}
          onChange={onAddFile}
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          required
        />
      )),
    );
  }, [filesCount]);

  // Fetch the Assignmet's details
  useEffect(() => {
    setLoadding(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1/api/v1/assignment/${id}`,
        ).then((res) => res.json());
        setAssignment(res.assignment);
        setLoadding(false);
      } catch (e) {
        setLoadding(false);
        console.error(e);
        toast.error(String(e));
      }
    };
    fetchData();
  }, []);

  const onNewFileInput = () => {
    setFilesCount((prevState) => prevState + 1);
  };

  const onAddFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFiles((prevState) => [...prevState, ...Array.from(files)]);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadding(true);

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(`file-${i}`, file);
    });

    try {
      const res = await fetch(`http://127.0.0.1/api/v1/assignment/${id}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        toast.success("Successfully filled in the assignment");
        setFiles([]);
        setFilesCount(1);
      } else {
        toast.error("Something went wrong :(");
      }
    } catch (e) {
      console.error(e);
    }
    setLoadding(false);
  };

  return (
    <>
      {!assignment || loadding ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <main className="p-12 min-h-fit">
            <h1 className="text-5xl">{assignment.Title}</h1>
            <div className="flex justify-between p-6 min-h-12">
              <div className="w-full flex justify-center pt-14">
                <p>{assignment.Description}</p>
              </div>
              <form
                onSubmit={onSubmit}
                className="flex flex-col items-center w-full border-l border-gray-300 gap-3 pt-14"
              >
                {filesInput}
                <div className="flex gap-2 items-center justify-center">
                  <button
                    onClick={onNewFileInput}
                    type="button"
                    className="btn btn-outline btn-success"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </main>
        </>
      )}
    </>
  );
}
