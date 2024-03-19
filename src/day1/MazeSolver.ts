
const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

function walk(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // Base cases
    // 1. Off the grid
    if (
        start.x < 0 ||
        start.x >= maze[0].length ||
        start.y < 0 ||
        start.y >= maze.length
    ) {
        return false;
    }

    // 2. Hit a wall
    if (maze[start.y][start.x] === wall) {
        return false;
    }

    // 3. Find the end
    if (start.x === end.x && start.y === end.y) {
        path.push(start);
        return true;
    }

    // 4. Seen the tile
    if (seen[start.y][start.x]) {
        return false;
    }

    // pre
    seen[start.y][start.x] = true;
    // recursion
    for (let i = 0; i < dir.length; ++i) {
        const [x, y] = dir[i];
        if (
            walk(
                maze,
                wall,
                { x: start.x + x, y: start.y + y },
                end,
                seen,
                path,
            )
        ) {
            path.push(start);
            return true;
        }
    }

    // post
    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
) {
    const seen: boolean[][] = [];
    // Initialize to false
    for (let i = 0; i < maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }
    const path: Point[] = [];

    walk(maze, wall, start, end, seen, path);
    return path;
}
