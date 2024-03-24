export const formatDate = (date: Date | undefined) => {
    if (!date) return;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hour = ('0' + d.getHours()).slice(-2);
    const mins = ('0' + d.getMinutes()).slice(-2);
    return month + '-' + day + '-' + year + ' ' + hour + ':' + mins;
}