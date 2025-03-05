app_name = "ex_stay"
app_title = "ex_stay"
app_publisher = "Carbonite-Solution.Ltd"
app_description = "A vacation bookings page for guests and for owners willing to rent out their property."
app_email = "nortexnoble@gmail.com"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "ex_stay",
# 		"logo": "/assets/ex_stay/logo.png",
# 		"title": "ex_stay",
# 		"route": "/ex_stay",
# 		"has_permission": "ex_stay.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------


doc_events = {
    "Doctype1": {
        "on_update": "ex_stay.api.create_user.create_user"
    },
        "Doctype2": {
        "on_update": "ex_stay.api.forgot_password.forgot_password"
    },
        "Doctype3": {
        "on_update": "ex_stay.api.booking.book"
    },
        "Doctype4": {
        "on_update": "ex_stay.api.countryList.countryInFrappe"
    },
        "Doctype5": {
        "on_update": "ex_stay.api.delete_comment.delete_comment"
    },
        "Doctype6": {
        "on_update": "ex_stay.api.homeproperty.homeproperty"
    },
        "Doctype7": {
        "on_update": "ex_stay.api.cancel_booking.cancel_booking"
    },
}






# include js, css files in header of desk.html
# app_include_css = "/assets/ex_stay/css/ex_stay.css"
# app_include_js = "/assets/ex_stay/js/ex_stay.js"

# include js, css files in header of web template
# web_include_css = "/assets/ex_stay/css/ex_stay.css"
# web_include_js = "/assets/ex_stay/js/ex_stay.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "ex_stay/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "ex_stay/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "ex_stay.utils.jinja_methods",
# 	"filters": "ex_stay.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "ex_stay.install.before_install"
# after_install = "ex_stay.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "ex_stay.uninstall.before_uninstall"
# after_uninstall = "ex_stay.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "ex_stay.utils.before_app_install"
# after_app_install = "ex_stay.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "ex_stay.utils.before_app_uninstall"
# after_app_uninstall = "ex_stay.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "ex_stay.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"ex_stay.tasks.all"
# 	],
# 	"daily": [
# 		"ex_stay.tasks.daily"
# 	],
# 	"hourly": [
# 		"ex_stay.tasks.hourly"
# 	],
# 	"weekly": [
# 		"ex_stay.tasks.weekly"
# 	],
# 	"monthly": [
# 		"ex_stay.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "ex_stay.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "ex_stay.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "ex_stay.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["ex_stay.utils.before_request"]
# after_request = ["ex_stay.utils.after_request"]

# Job Events
# ----------
# before_job = ["ex_stay.utils.before_job"]
# after_job = ["ex_stay.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"ex_stay.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }


website_route_rules = [{'from_route': '/frontend/<path:app_path>', 'to_route': 'frontend'},]