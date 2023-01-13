import React , {FC} from "react";
import { IResultScreen } from "../structure";

const ResultScreen: FC<IResultScreen> = ({ score,resetState}: IResultScreen) => {
  return (
    <div className="modal-area">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Score Board</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div className="modal-body">Congratulations !! You have score {score} points 🚀🚀🚀</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={resetState}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResultScreen;
