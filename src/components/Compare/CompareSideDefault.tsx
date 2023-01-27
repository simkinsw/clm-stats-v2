function CompareSideDefault({ side } : { side: string }) {
    return (
        <div className={`compare-side compare-side__${side}`}>
            <CompareSideTile heading="Current Position" />
            <CompareSideTile heading="Rating" />
            <CompareSideTile heading="Win - Loss" />
            <CompareSideTile heading="PR Events" />
            <CompareSideTile heading="Summer Rank" />
        </div>
    )
}

function CompareSideTile({ heading }: { heading: string }) {
    return (
        <div className="compare-side__tile">
            <div className="compare-side__heading">{heading}</div>
            <div className="compare-side__value--default"></div>
        </div>
    )
}

export default CompareSideDefault;