import {
  faPerson,
  faShareNodes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Assignment } from "../lib/auth-state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

interface Iprops {
  assignment: Assignment;
}

export default function AssignmentCard({ assignment }: Iprops) {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);

  const deleteAssigmentById = async () => {
    setDeleting(true);
    try {
      const res = await fetch(
        `http://127.0.0.1/api/v1/assignment/${assignment.Id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        toast.success("Successfully delted your assignment");
        setDeleted(true);
        setDeleting(false);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to delted the assignment");
      setDeleting(false);
    }
  };

  const date = new Date(assignment.Due);
  const fDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  return (
    <>
      {deleted ? null : (
        <>
          <div className="card bg-base-300 shadow-xl">
            {deleting ? (
              <div className="p-5 flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="p-8 flex justify-between">
                  <h2>{assignment.Title}</h2>
                  <span
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        `http://127.0.0.1/assignment/${assignment.Id}`,
                      );
                    }}
                  >
                    <FontAwesomeIcon icon={faShareNodes} />
                  </span>
                  <div>
                    <span className="mr-6">
                      {assignment.Completed}
                      <FontAwesomeIcon icon={faPerson} className="ml-1" />
                    </span>
                    <span className="mr-28">
                      {`${fDate}`}
                      <FontAwesomeIcon icon={faCalendar} className="ml-1" />
                    </span>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => {
                        const modal = document.getElementById(
                          `modal_card_${assignment.Id}`,
                        );
                        (modal as any)?.showModal();
                      }}
                    />
                  </div>
                </div>
                <dialog id={`modal_card_${assignment.Id}`} className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete assignment</h3>
                    <p className="py-4">
                      Are you sure that you want to delete this assignment?
                    </p>
                    <form method="dialog" className="flex gap-6">
                      <button className="btn btn-neutral">Close</button>
                      <button
                        className="btn btn-error"
                        onClick={deleteAssigmentById}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
