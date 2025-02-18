from specklepy.transports.server import ServerTransport
from specklepy.api import operations

from api.flatten import flatten_base
from api.data_extraction import get_properties_for_objects

def get_data(client, project_id, obj_id):
    # next create a server transport - this is the vehicle through which you will send and receive
    transport = ServerTransport(client=client, stream_id=project_id)

    received_base = operations.receive(obj_id=obj_id, remote_transport=transport) # This is your BASE object that has everything

    all_objects = list(flatten_base(received_base))

    # List of categories to filter
    filter_categories = ["Structural Framing", "Walls", "Structural Columns", "Curtain Panels", "Curtain Wall Mullions"]

    items = []
    id_lists = []

    for i in all_objects:
        if hasattr(i, "category"):  # Check if the object has the "category" attribute
            if i.category in filter_categories:  # Check if the category matches the filter list
                items.append(i)  # Append the whole object to the items list
                id_lists.append(i.id)
        else:
            continue  # Skip if "category" does not exist

    list_prop = [
        "id",
        "category",
        "family",
        "type",
        "properties.Material Quantities.*.materialName",
        "properties.Material Quantities.*.materialClass",
        "properties.Material Quantities.*.area",
        "properties.Material Quantities.*.volume",
    ]

    final_properties = get_properties_for_objects(items, list_prop)

    return final_properties