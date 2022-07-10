import { PieceType } from "./chess/Piece";
import { Position } from "./chess/Position";
import { Team } from "./chess/Team";
import { BoardRenderable } from "./chessRenderable/BoardRenderable";
import { GridRenderable } from "./chessRenderable/GridRenderable";
import { PieceManagerRenderable } from "./chessRenderable/PieceManagerRenderable";
import { BishopRenderable } from "./chessRenderable/pieces/BishopRenderable";
import { KnightRenderable } from "./chessRenderable/pieces/KnightRenderable";
import { PawnRenderable } from "./chessRenderable/pieces/PawnRenderable";
import { RookRenderable } from "./chessRenderable/pieces/RookRenderable";
import { Renderer } from "./chessRenderable/Renderer";
import "./style.css";

const canvas = document.createElement("canvas");

const size = Math.min(window.innerWidth, window.innerHeight);

canvas.width = size;
canvas.height = size;

document.body.appendChild(canvas);

const renderer = new Renderer(canvas);

const board = new BoardRenderable(
  new GridRenderable(8, 8),
  new PieceManagerRenderable(),
  {
    [PieceType.Pawn]: (position: Position, team: Team) =>
      new PawnRenderable(position, team === Team.White ? "#DDD" : "#333"),
    [PieceType.Bishop]: (position: Position, team: Team) =>
      new BishopRenderable(position, team === Team.White ? "#DDD" : "#333"),
    [PieceType.Knight]: (position: Position, team: Team) =>
      new KnightRenderable(position, team === Team.White ? "#DDD" : "#333"),
    [PieceType.Rook]: (position: Position, team: Team) =>
      new RookRenderable(position, team === Team.White ? "#DDD" : "#333"),
  }
);

board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(0, 1), Team.Black)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(1, 1), Team.Black)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(2, 1), Team.Black)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(3, 1), Team.Black)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(4, 1), Team.Black)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(5, 1), Team.Black)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(6, 1), Team.Black)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(7, 1), Team.Black)
);

board.addPiece(
  board.createPiece(PieceType.Bishop, new Position(2, 0), Team.Black)
);
board.addPiece(
  board.createPiece(PieceType.Bishop, new Position(5, 0), Team.Black)
);

board.addPiece(
  board.createPiece(PieceType.Knight, new Position(1, 0), Team.Black)
);
board.addPiece(
  board.createPiece(PieceType.Knight, new Position(6, 0), Team.Black)
);

board.addPiece(
  board.createPiece(PieceType.Rook, new Position(0, 0), Team.Black)
);
board.addPiece(
  board.createPiece(PieceType.Rook, new Position(7, 0), Team.Black)
);

board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(0, 6), Team.White)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(1, 6), Team.White)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(2, 6), Team.White)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(3, 6), Team.White)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(4, 6), Team.White)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(5, 6), Team.White)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(6, 6), Team.White)
);
board.addPiece(
  board.createPiece(PieceType.Pawn, new Position(7, 6), Team.White)
);

board.addPiece(
  board.createPiece(PieceType.Knight, new Position(1, 7), Team.White)
);
board.addPiece(
  board.createPiece(PieceType.Knight, new Position(6, 7), Team.White)
);

board.addPiece(
  board.createPiece(PieceType.Rook, new Position(0, 7), Team.White)
);
board.addPiece(
  board.createPiece(PieceType.Rook, new Position(7, 7), Team.White)
);

board.render(renderer);

// @ts-ignore
window.board = board;
