import {
  faPerson,
  faShareNodes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Assignment } from "../lib/auth-state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

interface Iprops {
  assignment: Assignment;
}

export default function AssignmentCard({ assignment }: Iprops) {
  const deleteAssigmentById = () => {
    try {
      fetch(`http://127.0.0.1/api/v1/assignment/${assignment.Id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error(e);
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
      <div className="card bg-base-300 shadow-xl">
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
      </div>
      <dialog id={`modal_card_${assignment.Id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete assignment</h3>
          <p className="py-4">
            Are you sure that you want to delete this assignment?
          </p>
          <form method="dialog" className="flex gap-6">
            <button className="btn btn-neutral">Close</button>
            <button className="btn btn-error" onClick={deleteAssigmentById}>
              Delete
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
