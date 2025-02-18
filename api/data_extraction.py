def get_nested_attr(obj, attr_path, default=None):
    """
    Safely get a nested attribute or dictionary key using a dot-separated path.
    Supports wildcard '*' for multiple properties.
    """
    parts = attr_path.split('.')

    def recursive_get(obj, parts):
        if not parts:
            return obj

        part = parts[0]

        # Handle wildcard
        if part == '*':
            results = []
            if isinstance(obj, dict):
                for value in obj.values():
                    if isinstance(value, (dict, list, tuple)) or hasattr(value, '__iter__'):
                        res = recursive_get(value, parts[1:])
                        if isinstance(res, list):
                            results.extend(res)
                        else:
                            results.append(res)
            elif isinstance(obj, (list, tuple)):
                for item in obj:
                    res = recursive_get(item, parts[1:])
                    if isinstance(res, list):
                        results.extend(res)
                    else:
                        results.append(res)
            return results or default

        # Handle dictionaries
        if isinstance(obj, dict):
            return recursive_get(obj.get(part, default), parts[1:])

        # Handle object attributes
        if hasattr(obj, part):
            return recursive_get(getattr(obj, part, default), parts[1:])

        return default

    return recursive_get(obj, parts)

    
def get_properties_for_one_object(obj, list_prop):
    """
    Retrieve specified properties for a single object.
    """
    result = {}
    for prop in list_prop:
        # Use generic nested attribute retrieval for properties
        result[prop] = get_nested_attr(obj, prop)
    return result

def get_properties_for_objects(objects, list_prop):
    """
    Retrieve specified properties for a single object or a list of objects
    based on a list of property paths.
    """
    # Check if input is a list of objects or a single object
    if isinstance(objects, list):
        return [get_properties_for_one_object(obj, list_prop) for obj in objects]
    else:
        return get_properties_for_one_object(objects, list_prop)