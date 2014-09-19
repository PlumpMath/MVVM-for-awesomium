﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Awesomium.Core;

namespace MVVMAwesonium.AwesomiumBinding
{
    internal class JSBasicObject : IJSCBridge
    {
        internal JSBasicObject(JSValue value, object icValue)
        {
            JSValue = value;
            CValue = icValue;
        }

        public override string ToString()
        {
            if (CValue is string)
            {
                return string.Format(@"""{0}""", ((string)CValue).Replace(@"""", @"\"""));
            }

            if (CValue is DateTime)
            {
                var dt = (DateTime)CValue;
                return string.Format(@"""{0:0000}-{1:00}-{2:00}T{3:00}:{4:00}:{5:00}.{6:000}Z""", dt.Year, dt.Month, dt.Day, dt.Hour, dt.Minute, dt.Second, dt.Millisecond);
            }

            return CValue.ToString();
        }

        public JSValue JSValue { get; private set; }

        public object CValue { get; private set; }

        public JSType Type { get { return JSType.Basic; } }

        public IEnumerable<IJSCBridge> GetChildren()
        {
            return Enumerable.Empty<IJSCBridge>();
        }
    }
}