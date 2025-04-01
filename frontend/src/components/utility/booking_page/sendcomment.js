import { ref } from "vue";
import { createResource } from "frappe-ui";

export function useSendComment(comment, property, userEmail, fetchComments) { 
    const errorMessage = ref("");
    const alertMessage = ref(null);
    const alertType = ref(null);

    const sendComment = async () => { 
        try {
            if (!comment.value) {
                errorMessage.value = "You cannot post an empty comment";
                alertMessage.value = "You cannot post an empty comment!";
                alertType.value = "warning";
                return;
            }

            errorMessage.value = ""; // Clear any previous errors

            const commentData = {
                doctype: "Property Comments",
                item: property.value?.item_code || "",
                email: userEmail.value || "",
                comment: comment.value || "",
            };

            // console.log("Comment data:", commentData);

            const commentResponse = await createResource({
                url: "frappe.client.insert",
                params: {
                    doc: commentData,
                },
            }).fetch();

            // console.log("API Response:", commentResponse);

            if (commentResponse && commentResponse.name) {
                comment.value = ""; // Clear input field
                alertMessage.value = `Comment posted successfully!`;
                alertType.value = "success";

                // ✅ Ensure `fetchComments` is called only if it exists
                if (fetchComments && typeof fetchComments === "function") {
                    fetchComments(); // Refresh comments
                } else {
                    // console.warn("⚠️ fetchComments is not defined, unable to refresh comments.");
                }
            } else {
                // console.error("❌ Comment posting failed:", commentResponse);
                alertMessage.value = "Comment posting failed. Please try again.";
                alertType.value = "error";
            }
        } catch (err) {
            // console.error("🚨 Unable to post comment", err);
        }
    };

    return {
        comment,
        sendComment, // Ensure correct function name
        alertMessage,
        alertType,
    };
}
