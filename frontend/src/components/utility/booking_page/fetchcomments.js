import { ref, onMounted } from "vue";
import { createResource } from "frappe-ui";

export function getComments() {
    const comments = ref([]);
    const alertMessage = ref(null);
    const alertType = ref(null);

    // Fetch comments for the selected property
    const commentResource = createResource({
        url: "frappe.client.get_list",
        params: {
            doctype: "Property Comments",
            fields: ["item", "email", "full_name", "comment", "name"], 
        },
    });

    const fetchComments = async () => {
        try {
            console.log("Fetching comments...");
            const response = await commentResource.fetch();
        

            if (Array.isArray(response)) {
                comments.value = response.map(comment => ({
                    item: comment.item,
                    email: comment.email,
                    full_name: comment.full_name,
                    comment: comment.comment,
                    name: comment.name
                }));                

                console.log("Comments:", comments.value);
            } else{
                console.error("Wrong Format of Response....");
            }
        } catch (error) {
            console.error("🚨 Unable to fetch comments:", error);
        }
    };


    // Delete comment using createResource
    const deleteComment = createResource({
        url: "ex_stay.api.delete_comment.delete_comment", 
        makeParams(commentName) {
            return { name: commentName }; 
        },
        onSuccess(data) {
            console.log("✅ Comment Deleted:", data);
            alertMessage.value = `Comment deleted successfully.`;
            alertType.value = "success";
            fetchComments(); // Refresh comments after deletion
        },
        onError(error) {
            console.error("🚨 Unable to delete comment:", error);
            alertMessage.value = "An error occurred while deleting the comment.";
            alertType.value = "error";
        },
    });


    onMounted(
        fetchComments
    );

    return {
        comments,
        fetchComments,
        deleteComment,
        alertMessage,
        alertType
    };
}
