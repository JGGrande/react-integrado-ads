export function Loading() {
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            zIndex: 999
        }}>
            <span className="loader"></span>
        </div>
    )
}